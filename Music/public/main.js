var app = angular.module('myApp', []);

app.controller('mainCtrl', function($scope,$compile, NoteService){
	$scope.test = "testing";

	$scope.next = function(){
		//Initialize question.
		var questionBox = angular.element(document.querySelector('div[id=questionBox]'));
		questionBox.children().remove();
		var note = NoteService.getQuestion();

		//Get key signature used.
		var key = NoteService.getKey();
		questionBox.append($compile(key)($scope));
		questionBox.append($compile(note)($scope));

		//Get clef used.
		var clefUsed = NoteService.getClefUsed();
		questionBox.css('background-image', 'url(img/Clef/' + clefUsed + '.jpg)' );

		//Get answers for the question.
		var answerSet = NoteService.getAnswerSet();
		var answerBox = angular.element(document.querySelector('div[id=answerBox]'));
		answerBox.children().remove();
		for(i = 0; i < answerSet.length; i++){
			answerBox.append($compile(answerSet[i])($scope));
		}
	}

	$scope.next();

});
app.directive('note', function(NoteService){
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
				NoteService.addExtraLine("top", scope.x);
			if(scope.y >= 43)
				NoteService.addExtraLine("bottom", scope.x);
		}
	}
});	
app.directive('answer', function(NoteService){
	return {
		scope : {
			value : '@'
		},
		link : function(scope, element){
			element.css('background-image', 'url(img/Answer/' + scope.value + '.jpg)');
			element.bind('click', function(){
				if(NoteService.isCorrectAnswer(scope.value))
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

app.service('NoteService', function($compile){

	//Get resource 
	var C = {	Key: ["C", "G", "F", "Bb", "Eb", "Ab", "Db"],
				CoorY: { G: [18, 45] , F : [25,0] }};
	var Cs = {	Key: ["D", "A", "E", "B", "Fs"],
				CoorY: { G: [18, 45] , F : [25,0] }};
	var Db = {	Key: ["Ab", "Db", "Gb"],
				CoorY: { G: [40, 14] , F : [47,22,-4] }};
	var D = {	Key: ["C", "G", "D", "A", "F", "Bb", "Eb"],
				CoorY: { G: [40, 14] , F : [47,22,-4] }};
	var Ds = {	Key: ["E", "B", "Fs"],
				CoorY: { G: [40, 14] , F : [47,22,-4] }};
	var Eb = { 	Key: ["Bb", "Eb", "Ab", "Db", "Gb"],
				CoorY: { G: [37, 10] , F : [45,18] }};
	var E = { 	Key: ["C", "G", "D", "A", "E", "B", "F"],
				CoorY: { G: [37, 10] , F : [45,18] }};
	var F = {	Key: ["C", "F", "Bb", "Eb", "Ab", "Db"],
				CoorY: { G: [33, 6.3] , F : [40,14] }};		
	var Fs = {	Key:["G", "D", "A", "E", "B", "Fs"],
				CoorY: { G: [33, 6.3] , F : [40,14] }};
	var Gb = { 	Key: ["Db", "Gb"],
				CoorY: { G: [29, 3.3] , F : [37.3,10.3] }};
	var G = { 	Key: ["C", "G", "D", "F", "Bb", "Eb", "Ab"],
				CoorY: { G: [29, 3.3] , F : [37.3,10.3] }};
	var Gs = { 	Key: ["A", "E", "B", "Fs"],
				CoorY: { G: [29, 3.3] , F : [37.3,10.3] }};
	var Ab = {	Key: ["Eb", "Ab", "Db", "Gb"],
				CoorY: { G: [25, 0] , F : [33,6.5] }};
	var A = {	Key: ["C", "G", "D", "A", "E", "F", "Bb"],
				CoorY: { G: [25, 0] , F : [33,6.5] }};
	var As = {	Key: ["B", "Fs"],
				CoorY: { G: [25, 0] , F : [33,6.5] }};
	var B = { 	Key: ["C", "G", "D", "A", "E", "B"],
				CoorY: { G: [47,22, -4] , F : [29,3.3] }};
	var Bb = { 	Key: ["F", "Bb", "Eb", "Ab", "Db", "Gb"],
				CoorY: { G: [47,22, -4] , F : [29,3.3] }};
	var noteList = [C, Cs, Db, D, Ds, Eb, E, F, Fs, Gb, G, Gs, Ab, A, As, B, Bb];
	var noteName = ["C", "Cs", "Db", "D", "Ds", "Eb", "E", "F", "Fs", "Gb", "G", "Gs", "Ab", "A", "As", "B", "Bb"];
	var clefName = ["G", "F"];
	var clefUsed = "";
	var keyUsed = "";
	var correctAnswerIndex = "";
	var correctAnswer = "";

	//
	this.getQuestion = function(){
		var randomIndex = Math.floor(Math.random() * noteList.length);
		var randomNote = noteList[randomIndex];

		//Choose Clef
		clefUsed = clefName[Math.floor(Math.random() * 2)];
		var choosenNoteArray = "";
		if(clefUsed == "G"){
			choosenNoteArray = randomNote.CoorY.G;
		}
		else
			choosenNoteArray = randomNote.CoorY.F;
		
		//Get key signature.
		var randomKeyIndex = Math.floor(Math.random() * randomNote.Key.length);
		keyUsed = randomNote.Key[randomKeyIndex];

		//Get note coordination.
		var x = '50';
		var randomNoteIndex = Math.floor(Math.random() * choosenNoteArray.length);
		var y = choosenNoteArray[randomNoteIndex];
		var note = "<note x=" + x + " y=" + y + "></note>";

		//Set correct answer
		correctAnswerIndex = randomIndex;
		correctAnswer = noteName[randomIndex];
		return note;
	}

	//
	this.getClefUsed = function(){
		return clefUsed;
	}

	//
	this.getKey = function(){
		var key = "<key value=" + keyUsed + " clef=" + clefUsed + " ></key>";
		return key;
	}

	//
	this.getAnswerSet = function(){

		var resultSet = [];

		//Get 3 wrong answers
		var firstIndex = correctAnswerIndex;
		var secondIndex = correctAnswerIndex;
		var thirdIndex = correctAnswerIndex;
		//First wrong answer.
		do{
			firstIndex = Math.floor(Math.random() * noteName.length);
		}while( firstIndex == secondIndex || firstIndex == thirdIndex || firstIndex == correctAnswerIndex);
		var answer = '<answer value=' + noteName[firstIndex] + ' ></answer>';
		resultSet.push(answer);
		//Second wrong answer.
		do{
			secondIndex = Math.floor(Math.random() * noteName.length);
		}while( secondIndex == firstIndex || secondIndex == thirdIndex || secondIndex == correctAnswerIndex);
		answer = '<answer value=' + noteName[secondIndex] + ' ></answer>';
		resultSet.push(answer);
		//Third wrong answer.
		do{
			thirdIndex = Math.floor(Math.random() * noteName.length);
		}while( thirdIndex == secondIndex || thirdIndex == firstIndex || thirdIndex == correctAnswerIndex);
		answer = '<answer value=' + noteName[thirdIndex] + ' ></answer>';
		resultSet.push(answer);

		//Add correct answer
		var cAnswer = '<answer value=' + noteName[correctAnswerIndex] + ' ></answer>';
		var randomInsertIndex = Math.floor(Math.random() * 4);
		resultSet.splice(randomInsertIndex, 0, cAnswer);

		return resultSet;

	}

	this.isCorrectAnswer = function(value){
		if(value == correctAnswer){
			return true;
		}
		else
			return false;
	};	

	this.addExtraLine = function(position, xCoor){
		var questionBox = angular.element(document.querySelector('div[id=questionBox]'));
		var yCoor = 0;
		if(position == "bottom" )
			yCoor = "45%";
		var extraLine = "<div class='extraline' style='left:" + xCoor + "%; top:" + yCoor + "'></div>";
		questionBox.append(extraLine); 
	}

});