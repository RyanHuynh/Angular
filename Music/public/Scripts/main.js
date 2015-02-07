var app = angular.module('myApp', []);

app.controller('mainCtrl', function($scope,$compile, NameNoteService, ChordService, GameControlService){
	var _category = "Note";
	$scope.testing = GameControlService.test;
	$scope.nextQuestionSwitch = false;
	$scope.checkRespond = function(){
		var respond = GameControlService.getQuestionRespond();
		//console.log(respond);
		var respondBox = angular.element(document.querySelector("div[id='respondBox']"));
		respondBox.append($compile(respond)($scope));

		//Display next question box.
		setTimeout(function(){
			$scope.nextQuestionSwitch = true;
			$scope.$apply();
		}, 1000);

		//Disable all answer buttons.
		angular.element(document.querySelector("div[id='answerBox']")).children().off('click');
	}
	var NameNoteRun = function(){
		var questionBox = angular.element(document.querySelector('div[id=questionBox]'));

		var note = NameNoteService.getQuestion();

		//Get key signature used.
		var key = NameNoteService.getKey();
		questionBox.append($compile(key)($scope));
		questionBox.append($compile(note)($scope));

		//Get clef used.
		var clefUsed = GameControlService.getClefUsed();
		questionBox.css('background-image', 'url(img/Clef/' + clefUsed + '.jpg)' );

		//Get answers for the question.
		var answerSet = NameNoteService.getAnswerSet();
		var answerBox = angular.element(document.querySelector('div[id=answerBox]'));
		answerBox.children().remove();
		for(i = 0; i < answerSet.length; i++){
			answerBox.append($compile(answerSet[i])($scope));
		}
	};

	var ChordRun = function(){
		var questionBox = angular.element(document.querySelector('div[id=questionBox]'));
		
		//Get clef used.
		var clefUsed = GameControlService.getClefUsed();
		questionBox.css('background-image', 'url(img/Clef/' + clefUsed + '.jpg)' );

		//Get question
		var notes = ChordService.getQuestion();
		for(i =0; i < notes.length; i++){
			var note = notes[i];
			questionBox.append($compile(note)($scope));
		}

		//Get answers for the question.
		var answerSet = ChordService.getAnswerSet();
		var answerBox = angular.element(document.querySelector('div[id=answerBox]'));
		answerBox.children().remove();
		for(i = 0; i < answerSet.length; i++){
			answerBox.append($compile(answerSet[i])($scope));
		}
	};
	$scope.next = function(){
		var nextBtn = angular.element(document.querySelector('div[id=nextQuestion]'));
		nextBtn.addClass('animated fadeOutDown');
		
		//Clear out the question box.
		var questionBox = angular.element(document.querySelector('div[id=questionBox]'));
		questionBox.children().remove();

		GameControlService.gameStart();
		if(_category == "Note")
			NameNoteRun();
		else
			ChordRun();

		//Add question text.
		questionBox.append("<p>The note is .... </p>");
		setTimeout(function(){
			nextBtn.removeClass('animated fadeOutDown');
			//$scope.nextQuestionSwitch  = false;
			$scope.$apply();
		}, 1000);
		//nextBtn.removeClass('animated fadeOutDown');
	}
	$scope.switchCategory = function(newCat){
		_category = newCat;
		$scope.next();
	}
	$scope.next();

});
app.directive('note', function(GameControlService){
	return{
		scope: {
			x : '@',
			y : '@',
			acc : '@'
		},
		template: "<accidential type='{{ acc }}'></accidential>",
		link : function(scope, element){
			//Pick a random node
			var noteDuration = GameControlService.getNoteDuration();
			element.css('background-image', noteDuration);
			element.css('left', scope.x + '%');
			element.css('top', scope.y + '%');

			//Add extra line if needed.
			GameControlService.addExtraLine(scope.x, scope.y);
		}
	}
});	
app.directive('accidential', function(){
	return {
		scope : {
			type : '@'
		},
		link : function(scope, element){
			element.css('background-image', 'url(img/Accidential/' + scope.type + '.png)');
		}
	}
})

app.directive('answer', function(GameControlService){
	return {
		link : function(scope, element, attrs){
			element.css('background-image', 'url(img/Answer/' + attrs.type + "/" + attrs.value + '.png)');
			//element.css('background-image', 'url(img/Answer/Note/test.png)');
			element.bind('click', function(){
				GameControlService.isCorrectAnswer(attrs.value);	
				scope.checkRespond();
				element.addClass('animated rotateOutDownLeft');
			});	

		}
	}
})
app.directive('respond', function($window){
	return {
		scope: {
			type : '@'
		},
		controller: function($scope){
			var randomRespondIndex = Math.floor(Math.random() * 4 + 1);
			if($scope.type == "R"){
				$scope.bkground = 'url(img/Respond/Correct/' + randomRespondIndex + '.png)';
			}
			else
				$scope.bkground = 'url(img/Respond/Wrong/' + randomRespondIndex + '.png)';
		},
		template : '{{ display }}',
		link : function(scope, element){
			element.css('background-image', scope.bkground);
			element.addClass('bounceIn');
		}
	}
});
app.directive('key', function(){
	return {
		scope : {
			value : '@',
			clef : '@'
		},
		link: function(scope, element){
			if(scope.clef == "F")
				element.css('top', '6%');
			element.css('background-image', 'url(img/Key/' + scope.value + '.png)');
		}
	}
});

//
app.directive('questionBoxSize',function(){
	return {
		restrict: 'C',
		link : function(scope, element, attrs){
			var elemWidth = element[0].offsetWidth;
			var elemHeight = elemWidth / 2.3;
			element.css("height", elemHeight + 'px');
		}
	}
});




