var app = angular.module('myApp', []);

app.controller('myCtrl', function($scope, $http){
	$scope.themeType = 'Identical';
	var valueArray = ['a','b','c','d','e','f','g','h'];
	$scope.saveTheme = function(){
		var dataArray = [];
		var backgroundBase = "img/Themes/" + $scope.themeType + "/" + $scope.themeName + "/";
		var countInput = 1;
		var arraySize = 16;
		if($scope.themeType == "Identical"){
			countInput = 2;
			arraySize = 8;
		}
		for(i = 0; i < arraySize; i++){
			var valueArrayIndex = Math.floor(i /2);
			var imgEndName = i%2;
			if($scope.themeType == 'Identical'){
				imgEndName = "";
				valueArrayIndex = i;
			}
			//alert(valueArrayIndex);
			var valueInput = valueArray[valueArrayIndex];
			
			
			var backgroundInput = backgroundBase + valueInput + imgEndName + '.jpg';
			var data = { value : valueInput, background: backgroundInput, count : countInput };
			dataArray.push(data);
		}
		$http.post('/api/themes/' + $scope.themeType, dataArray)
			.success(function(data){
				alert("Send completed");
			});
	}	
});