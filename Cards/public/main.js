

var app = angular.module('myApp' , ['ngAnimate']);

app.controller('mainCtrl', function($scope,$compile,$http){
    //Default gane setting
    $scope.themeSelection = 'Identical';
    $scope.overallAccuracy = '0%';
    $scope.lastGameAccuracy = '0%';
    $scope.gamePlayed = 1;
    $scope.gameInterupted = true;
    var totalClicked = 0;
    var timerDuration = 5;
    var hasTimer = "false";
    $scope.newGameBtnDisabled = false;
    //Attach timer
    var attachTimer = function(duration){
        var clock = $compile("<clock btn='newGameBtnDisabled' duration='" + duration + "'></clock>")($scope);
        var gameBox = angular.element(document.querySelector("div[id='gameBox']"));
        gameBox.append(clock);
    };

    //Generate our deck
    $scope.cardList = [];
    var generateCardList = function(theme, t){
        $http.get('api/themes/' + theme)
            .success(function(data){
                var selectedDeck = data;
                var arraySize = selectedDeck.length;
                for(i = 0; i < 16; i++){
                    var cardCreated = false;
                    while(!cardCreated){
                        var randomIndex = Math.floor(Math.random() * arraySize);
                        var newCard = selectedDeck[randomIndex];
                        if(newCard.count > 0){
                            newCard.count--;
                            cardCreated = true;
                            $scope.cardList.push({ value : newCard.value, cover: newCard.background });
                        }
                    }
                }

                //Attach game to game box.
                var game = $compile("<card-generator timer='" + t + "' collections='cardList'></card-generator>")($scope);
                var gameBox = angular.element(document.querySelector("div[id='gameBox']"));
                gameBox.append(game);
            });
    };
   
    //Create new game.
    $scope.newGame = function(){
        //Reset pre-condition for the game.
        $scope.cardList = [];
        if($scope.gameInterupted){
            $scope.lastGameAccuracy = "0%";
        }
        else{
              $scope.gamePlayed++;
              $scope.gameInterupted = true;
        }
           
        //Attach timer for the game.
        if ($scope.themeSelection == 'Shape'){
             attachTimer(timerDuration);
             hasTimer = "true";
        }
        else
            hasTimer = "false";
           
        //Remove old game.
        var querySelector = document.querySelector("card-generator");
        if(querySelector != null)
        {
            var oldGame = angular.element(document.querySelector("card-generator"));
            //oldGame.scope().$destroy();
            oldGame.remove();
        }
        //oldGame.children().remove();
        //alert(oldGame.scope().currentState);
        //oldGame.remove();

        //Create new game board.
        generateCardList($scope.themeSelection, hasTimer);
    };

    //Update accuracy
    $scope.updateAccuracy = function(accuracy){
        $scope.lastGameAccuracy = Math.floor((16 / accuracy) * 100) + "%";
        totalClicked += accuracy;
        $scope.overallAccuracy = Math.floor((16 * $scope.gamePlayed / totalClicked) * 100) + "%";
    };
   $scope.newGame();
});

app.directive('cardGenerator', function(){
    return{
        scope: {
            collections: '=',
            timer: '@'
        },
        template: "<card timer='{{ timer }}' ng-repeat='card in collections' index='{{ $index }}' data='card'></card>",
        controller : function($scope){

            //Default state of game start at 1.
            $scope.currentState = '1';

            //Some variables
            var comparedCardValue = "";
            var comparedCardIndex ="";
            var matchedCardIndex = "";
            var matchedPairCount = 8;
            var cardClicked = 0;
            this.locked = false;
           
            //Check to see if timer is in used
            this.useTimer = function(){
                return ($scope.hasTimer == "true") ? true : false;
            }
            //Return current state of game board.
            this.getState = function(){
                return $scope.currentState;
            };

            //Set new state for game board.
            this.setState = function(newState){
                $scope.currentState = newState;
                $scope.$apply();
            };
            
            //Return value/index of the card being compared.
            this.getComparedValue = function(){
                return comparedCardValue;
            };
            this.getComparedCardIndex = function(){
                return comparedCardIndex;
            };
            this.setComparedCard = function(index,value){
                comparedCardIndex = index;
                comparedCardValue = value;
            };
            this.setMatchedCardIndex = function(index){
               matchedCardIndex = index;
            };

            //Update card click to calculate accuray
            this.updateCardClick = function(){
                cardClicked++;
            };
            //Watch for state change.
            $scope.$watch('currentState', function(newVal, oldVal){
                
                //At state 3 ( found matched card )
                if($scope.currentState == "3"){
                    matchedPairCount--;

                    //Disable click on matched cards.
                    var comparedCard = angular.element(document.querySelector("card[index='" + comparedCardIndex + "']"));
                    comparedCard.off('click');
                    var matchedCard = angular.element(document.querySelector("card[index='" + matchedCardIndex + "']"));
                    matchedCard.off('click');

                    //All cards matched -> end game.
                    if (matchedPairCount == 0){
                        $scope.$parent.updateAccuracy(cardClicked);
                        $scope.$parent.gameInterupted = false;
                    }
                    else{
                        //Cant find matched card this round -> back to state 1.
                        comparedCardValue = "";
                        comparedCardIndex ="";
                        $scope.currentState = "1";
                    }
                }
            });
        }
    }
});

app.directive('card', function(){
    return {
        require : '^?cardGenerator',
        scope: {
            data : '=', 
            timer : '@'
        },
        template:  "<front style='background-image: url({{ data.cover }})'></front>" +
                    "<back></back>",
        link : function(scope, element, attrs, cardGenCtrl){
            //Flipped all card if timer is in used.
            if(scope.timer == "true")
                element.toggleClass('flipped');
            element.bind('click', function(){
                //Disable lock to allow only 2 cards to be flipped at a time.
                if(!cardGenCtrl.locked){
                    //Update click to calculate accuracy.
                    cardGenCtrl.updateCardClick();
                    var currentState = cardGenCtrl.getState();
                    if(currentState == '1'){
                        cardGenCtrl.setComparedCard(attrs.index, scope.data.value);
                        element.toggleClass('flipped');
                        cardGenCtrl.setState("2");
                    }
                    else if(currentState == "2"){
                        if(cardGenCtrl.getComparedCardIndex() != attrs.index)
                        {
                            element.toggleClass('flipped');
                            var comparedValue = cardGenCtrl.getComparedValue();
                            if(comparedValue == scope.data.value){
                                cardGenCtrl.setMatchedCardIndex(attrs.index);
                                cardGenCtrl.setState('3');
                            }
                            else
                           {
                                cardGenCtrl.locked = true;
                                setTimeout(function(){
                                    var comparedCardIndex = cardGenCtrl.getComparedCardIndex();
                                    var comparedCard = angular.element(document.querySelector("card[index='" + comparedCardIndex + "']"));
                                    comparedCard.toggleClass('flipped');
                                    element.toggleClass('flipped');
                                    cardGenCtrl.setState('1');  
                                    cardGenCtrl.locked = false;
                                }, 1500);
                           }
                        }
                    }
                }
            }); 
        }
    }
});

app.directive('clock', function($timeout){
    return {
        scope:{ 
            duration: '@',
            btn: '='
        },
        controller: function($scope){
            $scope.timeout = $scope.duration;
        },
        template: "<h1 class='bounceInDown animated'>{{ timeout }}</h1>",
        link: function(scope, element,attrs){
            //New game button (disable this button when timer is running)
            scope.btn = true;
            //newGameBtn.prop('ng-disabled', 'true');
            var countdown = function(){
                scope.timeout--;
                if(scope.timeout > 0)
                    $timeout(countdown, 1000);
                else{
                    //Flipped all card down.
                angular.element(document.querySelector("card-generator")).children().toggleClass('flipped');
                    //Turn new game button back on.
                    scope.btn = false;
                    element.remove();
                }
                    
            };
            $timeout(countdown, 1000);
        }
    }
});









