var app = angular.module("myApp", []);

app.controller("appControl", function($scope, $http){
	$http.get("http://www.w3schools.com/website/Customers_JSON.php")
	.success(function(data){
		$scope.items = data;
		$scope.selectedItem = $scope.items[0];
	});
});
