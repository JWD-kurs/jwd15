var app = angular.module('domaciApp', []);
app.controller('zadatak1Ctrl',function ($scope) {
	$scope.obrisi = function () {
		$scope.vrednost = '';
	}
});
app.controller('zadatak2Ctrl', function($scope){
	$scope.prebaci = function () {
		$scope.vrednost2 = $scope.vrednost1;
	}
});
