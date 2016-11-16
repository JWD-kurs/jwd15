var app = angular.module('wafepaApp', ['ngRoute']);
app.config(function($routeProvider) {
	// $routeProvider
	// .when('/home',
	// 	{templateUrl:'home.html'});
	// console.log('pokrenula se angular aplikacija');
});
app.controller('myCtrl', function($scope){
	$scope.ime='Pera';
	$scope.prezime='Peric';
	$scope.lista = ['asdaf','fds','asdf','asdffsd'];
	$scope.obrisiIme = function(){
		$scope.ime='';
	};
	$scope.proba = function(){
		console.log('!!!');
	};	
});
app.controller('myNewCtrl',function ($scope){
	$scope.poruka='hello world';
}
);

