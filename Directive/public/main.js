var app = angular.module('myApp' , ['ngAnimate']);

app.controller('myCtrl', function($scope){
	$scope.nameList = [{ Name: 'Ryan',
					Profession: 'CEO' },
					{ Name: 'Dave',
					Profession: 'Chef' },
					{ Name: 'Wendy',
					Profession: 'Accounting' },
					{ Name: 'Emily',
					Profession: 'Teacher' },
					{ Name: 'Kobe',
					Profession: 'Basketball Pro' },
					{ Name: 'Micheal',
					Profession: 'Swimmer' },
					];
	$scope.reset = function(){
		$scope.nameList[3] = { Name: 'Emily',
					Profession: 'Teacher' }
	};
});

app.directive('simpleDirective', function(){
	return {
		template : "<p>My name is {{ nameList[0].Name }} and I'm a {{ nameList[0].Profession }}"
	};
});

app.directive('directiveWith1WayBindingScope', function(){
	return {
		scope : {
			data : '@'
		},
		template : "<p>This is value from directive: <b>{{ data }}</b>.</p> <p>Value can be changed using the input below.</p>" +
				   "<p>New value: <input type='text' ng-model='data'></p>"
	};
});


app.directive('directiveWith2WayBindingScope', function(){
	return {
		scope : {
			data : '='
		},
		template : "<p>This is value from directive: <b>{{ data }}</b>.</p> <p>Value can be changed using the input below.</p>" +
				   "<p>New value: <input type='text' ng-model='data'></p>"
	};
});


app.directive('directiveWithFunctionScope', function(){
	return {
		scope : {
			data : '=',
			action : '&'
		},
		template : "<p>This is value from directive: <b>{{ data }}</b>.</p> <p>Value can be changed using the input below.</p>" +
				   "<p>New value: <input type='text' ng-model='data'>  <input type='button' ng-click='action()' value='Reset me'></p>"
	};
});

app.directive('directiveWithTransclude', function(){
	return {
		transclude : true,
		template: '<p>If you can see the sentence below then our implementation is correct.</p>' +
				   '<ng-transclude></ng-transclude>'
	};
});

app.directive('parent', function() {
  	return {
  		transclude: true,
  		
  		scope: {
  			pvalue: '@'
  		},
  		require: '^grandParent',
    	controller: function($scope){
    		this.value = "<b>Hi I'm parent.</b>";
    	},
    	template: '<p>This value is private to parent only: <b>{{ pvalue }}</b></p>' + 
  				  '<ng-transclude></ng-transclude>'
	}
});

app.directive('grandParent', function(){
	return {
		transclude: true,
		template: '<ng-transclude></ng-transclude>',
		controller: function($scope){
    		this.value2 = "<b>Hi I'm grand parent.</b>";
    	}
	}
});


app.directive('child', function() {
  	return {
    	require: ['^parent', '^grandParent'],
    	link: function($scope, $element, attr, myCtrl){
     		$element.replaceWith(angular.element('<p>This value come from parent: ' +  myCtrl[0].value + '</p>' + 
     											'<p>This value come from grand parent: ' +  myCtrl[1].value2 + '</p>'));
    	}
  	}
});



