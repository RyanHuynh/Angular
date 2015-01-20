var app = angular.module('myApp' , ['ngRoute', 'ngAnimate']);
var previousRoute = "";
app.service('routeHelper', function(){
	var routeParam = ['home', 'art', 'car', 'game'];
	this.getAnimateDirection = function(currentRoute){
		var indexCurrentRoute = '';
		var indexPrevRoute = '';
		for(i in routeParam){
			if(routeParam[i] == currentRoute){
				indexCurrentRoute = i;
			}
			if(routeParam[i] == previousRoute ){
				indexPrevRoute = i;
			}
		}

		if(indexPrevRoute == ''){
			return 'no-animate';
		}
		else if( indexPrevRoute < indexCurrentRoute){
			return 'right-to-left';
		}
		else if( indexPrevRoute > indexCurrentRoute){
			return 'left-to-right';
		}

	};
});

app.config(['$routeProvider', function($routeProvider){
	$routeProvider
		.when('/', {
			templateUrl: 'View/home.html', 
			controller: 'homeCtrl'
		})
		.when('/car', {
			templateUrl: 'View/car.html',
			controller: 'carCtrl'
		})
		.when('/art', {
			templateUrl: 'View/art.html', 
			controller: 'artCtrl'
		})
		.when('/game', {
			templateUrl: 'View/game.html',
			controller: 'gameCtrl'
		});


}]);


app.controller('homeCtrl', function($scope, routeHelper){
	$scope.bkgroundColor = 'homeColor ';
	$scope.animation = routeHelper.getAnimateDirection('home');

	
	previousRoute = 'home';
});

app.controller('carCtrl', function($scope, routeHelper){
	$scope.bkgroundColor = 'carColor ';
	$scope.animation = routeHelper.getAnimateDirection('car');

	previousRoute = 'car';

});

app.controller('gameCtrl', function($scope, routeHelper){
	$scope.bkgroundColor = 'gameColor ';
	$scope.animation = routeHelper.getAnimateDirection('game');

	previousRoute = 'game';

});

app.controller('artCtrl', function($scope, routeHelper){
	$scope.bkgroundColor = 'artColor ';
	$scope.animation = routeHelper.getAnimateDirection('art');

	previousRoute = 'art';

});