var app = angular.module('myApp' , ['ngAnimate']);

app.controller('mainCtrl', function($scope,$compile){
    $scope.themeSelection = 'default';
    $scope.overallAccuracy = '0%';
    $scope.lastGameAccuracy = '0%';
    $scope.gamePlayed = 1;
    $scope.gameInterupted = true;
    var totalClicked = 0;

    //Deck with different themes
    var defaultDeck = [ { value : "A", background: "img/apple.jpeg", count : 2 },
                        { value : "B", background: "img/marvel.jpeg", count : 2 },
                        { value : "C", background: "img/car.jpeg", count : 2 },
                        { value : "D", background: "img/fun.jpeg", count : 2 },
                        { value : "E", background: "img/singer.jpeg", count : 2 },
                        { value : "F", background: "img/kitty.jpeg", count : 2 },
                        { value : "G", background: "img/puppy.jpeg", count : 2 },
                        { value : "H", background: "img/school.jpeg", count : 2 }];
    //Generate card list
    $scope.cardList = [];
    var generateCardList = function(theme){
        var selectedDeck = "";
        if(theme == "default"){
            selectedDeck = defaultDeck.slice();
        }
        for(i = 0; i < 16; i++){
            var cardCreated = false;
            while(!cardCreated){
                var randomIndex = Math.floor(Math.random() * 8);
                var newCard = selectedDeck[randomIndex];
                if(newCard.count > 0){
                    newCard.count--;
                    cardCreated = true;
                    $scope.cardList.push({ value : newCard.value, cover: newCard.background });
                }
            }
        }

        //Reset count for our selected deck
        for(j = 0; j < selectedDeck.length; j++){
            selectedDeck[j].count = 2;
        }
    };

    //Create new game.
    $scope.newGame = function(){
        $scope.cardList = [];
        if($scope.gameInterupted){
            $scope.lastGameAccuracy = "0%";
        }
        else
             $scope.gamePlayed++;
       
        var gameBox = angular.element(document.querySelector("div[id='gameBox']"));
        var oldGame = angular.element(document.querySelector("card-generator"));
        generateCardList($scope.themeSelection);
        var game = $compile("<card-generator collections='cardList'></card-generator>")($scope);
        oldGame.replaceWith(game);
        $scope.gameInterupted = true;
    };

    //Update accuracy
    $scope.updateAccuracy = function(accuracy){
        $scope.lastGameAccuracy = Math.floor((16 / accuracy) * 100) + "%";
        totalClicked += accuracy;
        $scope.overallAccuracy = Math.floor((16 * $scope.gamePlayed / totalClicked) * 100) + "%";
    };
    generateCardList($scope.themeSelection);
});

app.directive('cardGenerator', function(){
    return{
        scope: {
            collections: '='
        },
        template: "<card ng-repeat='card in collections'  index='{{ $index }}' data='card'></card>",
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
            data : '='
        },
        template:  "<front style='background-image: url({{ data.cover }})'></front>" +
                    "<back></back>",
        link : function(scope, element, attrs, cardGenCtrl){
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
                                }, 1000);
                           }
                        }
                    }
                }
            }); 
        }
    }
});