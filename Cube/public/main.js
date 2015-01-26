var app = angular.module('myApp' , ['ngAnimate']);
app.controller('cubeCtrl', function($scope,$compile){

    //Empty array used  to generate cube.
    $scope.array = [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},
                    {},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},
                    {},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},
                    {},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},
                    {},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},
                    {},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},
                    {},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},
                    {},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},
                    {},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},
                    {},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}];

    //Default cube setting.
    $scope.animationChoice = 'brush';
    $scope.displayChoice = 'full';

    //Generate cubes base on setting
    $scope.generateCube = function(){
        angular.element(document.getElementById('placeHolder')).empty();
        angular.element(document.getElementById('placeHolder')).append($compile("<cube-generator></cube-generator")($scope));
    };
});

app.directive('cubeGenerator', function(){
    return {
        controller: function($scope){
            //Get random color
            this.red = Math.floor(Math.random() * 255);
            this.green = Math.floor(Math.random() * 255);
            this.blue = 0;
            
            //Get animation type.
            this.animationType = $scope.animationChoice;

            //Get display choide.
            this.displayType = $scope.displayChoice;

        },
        template: "<cube ng-repeat='i in array' position='{{ $index }}'></cube>"
    }
});

app.directive('cube', function(){
    return {
        restrict: 'E',
        require: '^cubeGenerator',
        scope: {
            position: '@'
        },
        link: function(scope, $element, attrs, cubeGenCtrl){
            $element.addClass('cube');

            //Speed to generate cubes
            var generateSpeed = scope.position * 100;
            //multiply ratio to make each cube with different color.
            var multiplyRatio = 2;
            if(cubeGenCtrl.displayType == 'chess')
                multiplyRatio = 1.5;

            var color = 'rgb(' + cubeGenCtrl.red + ',' +  cubeGenCtrl.green + ',' +  
                (cubeGenCtrl.blue + scope.position * multiplyRatio) + ')';
            setTimeout(function(){
                $element.css('background', color);
                $element.addClass(cubeGenCtrl.animationType);
                //$element.addClass('animated flip');
            },generateSpeed);

            $element.bind('click', function(){
                $element.addClass('animated flip');
            });
        }
    }
});



