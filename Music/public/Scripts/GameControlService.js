app.service('GameControlService', function(NameNoteService){
	//
	this.addExtraLine = function(position, xCoor){
		var questionBox = angular.element(document.querySelector('div[id=questionBox]'));
		var yCoor = 0;
		if(position == "bottom" )
			yCoor = "45%";
		var extraLine = "<div class='extraline' style='left:" + xCoor + "%; top:" + yCoor + "'></div>";
		questionBox.append(extraLine); 
	}
	this.isCorrectAnswer = function(value){
		return NameNoteService.checkAnswer(value);
	};	
})