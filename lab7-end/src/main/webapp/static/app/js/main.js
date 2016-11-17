var wafepaApp = angular.module('wafepaApp', ['ngRoute']);

wafepaApp.controller('MyController', function($scope) {
	
	$scope.tekst = 'Cao ja sam tekst';
	
	$scope.broj = 5;
	
	$scope.objekat = { polje: 'vrednost' };
	
	$scope.lista = [3, 4, 'haha', {}, []];
	
	$scope.funkcija = function(p) {
		$scope.lista[4] = $scope.lista[0]*$scope.lista[0];
	};

});

wafepaApp.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl : '/static/app/html/partial/home.html'
        })
        .when('/activities', {
            templateUrl : '/static/app/html/partial/activities.html',
            controller: 'activitiesCtrl'
        
        })
        .when('/activity/:id', {
            templateUrl : '/static/app/html/partial/activity.html',
            controller: 'activityCtrl'
        
        })
        .otherwise({
            redirectTo: '/'
        });
});

wafepaApp.controller('activitiesCtrl',function ($scope,$http,$location) {
	var loadActivities = function(){
		$http.get('api/activities')
		.success(function (data, code) {
			$scope.activities = data;
			console.log(code);
		})
		.error(function (data, code) {
			console.log('data: '+data);
			console.log('code: '+code);
		});
	}
	loadActivities();
	$scope.delete = function (id) {
		console.log('brisanje id: '+id);
		$http.delete('api/activities/'+id)
		.success(function(data, status){
			console.log('success! '+data+':'+status)
			loadActivities();
		})
		.error(function(data, status){
			console.log('error! '+data+':'+status)
		});
	}
	// act={name:'aktivnosti 1',
	// 	comment:{
	// 		field:'asdfs'
	// 	}
	// 		}
	// $scope.act={};
	$scope.save = function () {
		if($scope.act.id){
			$http.put('api/activities/'+$scope.act.id,$scope.act)
			.success(function () {
				loadActivities();
				$scope.act = {};
			})
			.error(function () {
				console.log('error!')
			});
		}
		else{
			$http.post('api/activities',$scope.act)
			.success(function (data, code) {
				console.log('code: '+code);
				loadActivities();
				$scope.act = {};
			})
			.error(function (data, code) {
				console.log('data: '+data);
				console.log('code: '+code);
			});
		}
	}
	$scope.edit = function (activity) {
		$scope.act={};
		$scope.act.name = activity.name;
		$scope.act.id = activity.id;
		console.log($scope.act);
	}
	$scope.editInNewPage = function (activity) {
		$location.path('activity/'+activity.id);
	}

});

wafepaApp.controller('activityCtrl', function($http, $scope, $routeParams, $location){
	var id = $routeParams.id;
	$http.get('api/activities/'+id)
	.success(function (data) {
		$scope.act = data;
	});
	$scope.save = function () {
		$http.put('api/activities/'+id,$scope.act)
		.success(function () {
			$location.path('activities');
		});
	}
});