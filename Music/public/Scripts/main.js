var app = angular.module('myApp', []);

app.controller('mainCtrl', function($scope,$compile, NameNoteService){
	$scope.test = "testing";

	$scope.next = function(){
		//Initialize question.
		var questionBox = angular.element(document.querySelector('div[id=questionBox]'));
		questionBox.children().remove();
		var note = NameNoteService.getQuestion();

		//Get key signature used.
		var key = NameNoteService.getKey();
		questionBox.append($compile(key)($scope));
		questionBox.append($compile(note)($scope));

		//Get clef used.
		var clefUsed = NameNoteService.getClefUsed();
		questionBox.css('background-image', 'url(img/Clef/' + clefUsed + '.jpg)' );

		//Get answers for the question.
		var answerSet = NameNoteService.getAnswerSet();
		var answerBox = angular.element(document.querySelector('div[id=answerBox]'));
		answerBox.children().remove();
		for(i = 0; i < answerSet.length; i++){
			answerBox.append($compile(answerSet[i])($scope));
		}
	}

	$scope.next();

});
app.directive('note', function(GameControlService){
	return{
		scope: {
			x : '@',
			y : '@'
		},
		link : function(scope, element){
			//Pick a random node
			var randomImage = Math.floor(Math.random() * 5 + 1);
			element.css('background-image', 'url(img/Note/' + randomImage + '.png)');
			element.css('left', scope.x + '%');
			element.css('top', scope.y + '%');

			//Add extra line if needed.
			if(scope.y <= 0) //top line
				GameControlService.addExtraLine("top", scope.x);
			if(scope.y >= 43)
				GameControlService.addExtraLine("bottom", scope.x);
		}
	}
});	
app.directive('answer', function(GameControlService){
	return {
		scope : {
			value : '@'
		},
		link : function(scope, element){
			element.css('background-image', 'url(img/Answer/' + scope.value + '.jpg)');
			element.bind('click', function(){
				if(GameControlService.isCorrectAnswer(scope.value))
					element.css('background', 'green');
				else
					element.css('background', 'red');
			});	
		}
	}
})
app.directive('key', function(){
	return {
		scope : {
			value : '@',
			clef : '@'
		},
		link: function(scope, element){
			if(scope.clef == "F")
				element.css('top', '7.6%');
			element.css('background-image', 'url(img/Key/' + scope.value + '.png)');
		}
	}
});
app.directive('questionBoxSize',function(){
	return {
		restrict: 'C',
		link : function(scope, element, attrs){
			var elemWidth = element[0].offsetWidth;
			var elemHeight = elemWidth / 3;
			element.css("height", elemHeight + 'px');
		}
	}
});

