var wafepaApp = angular.module('wafepaApp', ['ngRoute','ui.bootstrap']);

wafepaApp.controller('MyController', function($scope) {
	
	$scope.tekst = 'Cao ja sam tekst';
	
	$scope.broj = 5;
	
	$scope.objekat = { polje: 'vrednost' };
	
	$scope.lista = [3, 4, 'haha', {}, []];
	
	$scope.funkcija = function(p) {
		$scope.lista[4] = $scope.lista[0]*$scope.lista[0];
	};

});

wafepaApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl : '/static/app/html/partial/home.html'
        })
        .when('/editActivity/:id', {
            templateUrl : '/static/app/html/partial/editActivity.html',
            controller: 'editActivityCtrl'
        })
        .when('/activities', {
            templateUrl : '/static/app/html/partial/activities.html',
            controller: 'activitiesCtrl'
        })
        .when('/books', {
            templateUrl : '/static/app/html/partial/books.html',
            controller: 'booksCtrl'
        })
        .otherwise({
            redirectTo: '/',
        });
}]);

wafepaApp.controller('booksCtrl', function($scope,$http){
	var loadAuthors = function(){
		$http.get('api/authors')
		.success(function (data, status) {
			$scope.authors = data;
		})
		.error(function (data, status) {
			console.log(data);
			console.log(status);
		})
	};
	var loadBooks = function(){
		$http.get('api/books')
		.success(function (data, status) {
			$scope.books = data;
		})
		.error(function (data, status) {
			console.log(data);
			console.log(status);
		})
	};
	//JavaScript pozivi su neblokirajuci
	//pocece izvrsavanje loadAuthors() pre nego sto se zavrsi loadBooks()
	loadBooks();
	loadAuthors();
	$scope.formatAuthors = function (authors) {
		var retVal = '';
		for (var i = 0; i < authors.length; i++) {
			retVal += authors[i].firstName+' '+authors[i].lastName+', ';
		};
		return retVal.substring(0,retVal.length-2);
	};
	$scope.saveBook = function () {
		var bookDTO = {title:$scope.newBook.title};
		bookDTO.authors = [];
		for (var i = $scope.newBook.authors.length - 1; i >= 0; i--) {
			bookDTO.authors.push({id:$scope.newBook.authors[i]});
		};
		// $http.post('api/books',bookDTO)
		// ng-options prosledjuje ceo objekat, pa nije potrebno formatiranje
		if(!$scope.newBook.id){
			$http.post('api/books',$scope.newBook)
			.success(function () {
				loadBooks()
			});
		}
		else{
			$http.put('api/books/'+$scope.newBook.id,$scope.newBook)
			.success(function () {
				loadBooks()
			});			
		}
	};
	$scope.editBook = function (book) {
		$scope.newBook = angular.copy(book);
	}
	$scope.formatAuthor =function (author) {
		return author.firstName + ' ' + author.lastName;
	};
});

wafepaApp.controller('activitiesCtrl', function($scope,$http,$location,$uibModal){
	$scope.currentPage=0;
	$scope.changePage = function (i) {
		$scope.currentPage += i;
		console.log($scope.currentPage);
		ucitajAktivnosti();
	}
	var ucitajAktivnosti = function () {
		var parameters = {};
		if ($scope.filter && $scope.filter.name) {
			parameters.name = $scope.filter.name;
		};
		parameters.page = $scope.currentPage;
		$http.get('api/activities',{params:parameters})
			.success(function (data, status) {
				$scope.activities = data;
				$scope.act = {};
			})
			.error(function (data, status) {
				console.log('ERROR!');
			});
	}
	ucitajAktivnosti();
	$scope.deleteActivity = function (id) {
		$http.delete('api/activities/'+id)
		.success(function() {
			ucitajAktivnosti();
		});
	}
	// $scope.act={};
	$scope.saveActivity = function () {
		console.log(JSON.stringify($scope.act));
		if(!$scope.act.id){
			$http.post('api/activities',$scope.act)
			.success(function () {
				$scope.alerts.push({type:'success',msg:'Aktivnost '+$scope.act.name+' je uspesno dodata'})
				$scope.filter = {};
				ucitajAktivnosti();
			});
		}
		else{
			$http.put('api/activities/'+$scope.act.id,$scope.act)
			.success(function () {
				ucitajAktivnosti();
			});			
		}
	}
	$scope.editActivity = function(activity){
		$scope.act = activity;
	}
	$scope.editNewPage = function(activity){
		$location.path('editActivity/'+activity.id);
	}
	$scope.alerts = [
    	// { type: 'danger', msg: 'Oh snap! Change a few things up and try submitting again.' },
    	// { type: 'success', msg: 'Well done! You successfully read this important alert message.' }
  	];

	$scope.addAlert = function() {
		$scope.alerts.push({msg: 'Another alert!'});
	};

	$scope.closeAlert = function(index) {
		$scope.alerts.splice(index, 1);
	};

	$scope.open = function (size) {
	    var modalInstance = $uibModal.open({
	      templateUrl: '/static/app/html/partial/modal.html',
	      controller: 'ModalInstanceCtrl',
	      size: size
	    });
	}

	$scope.search = function(){
		console.log($scope.filter);
		ucitajAktivnosti();
	}
	
});

wafepaApp.controller('ModalInstanceCtrl', function ($uibModalInstance, $scope) {
  $scope.ok = function () {
    $uibModalInstance.close('ok');
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});

wafepaApp.controller('editActivityCtrl',function ($scope,$http,$routeParams,$location) {
	var ucitajAktivnost = function () {
		$http.get('api/activities/'+$routeParams.id)
		.success(function (data, status) {
			$scope.activity = data;
		})
	}
	ucitajAktivnost();
	$scope.save = function () {
		$http.put('api/activities/'+$routeParams.id,$scope.activity)
		.success(function () {
			$location.path('activities');
		});
	}
})