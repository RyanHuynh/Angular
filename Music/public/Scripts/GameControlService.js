/* 
Responsible for handling state of game, and construct extra UI element such as extra music bar.
*/

app.service('GameControlService', function(){

	/****************************************
	 *				 VARIABLES  			*
	 ****************************************/

	//Common variable
	var _noteDuration = "";
	var _clefUsed = "";
	var _clefName = ["G", "F"];
	var _correctAnswer = "";
	var _questionRespond = "";

	//Variables used in respond function
	var _rightRespond = "R";
	var _wrongRespond = "W";

	//Variable used for adding extra bar.
	var _topFirstThreshold = 30.5;
	var _topSecondThreshold = 26;
	var _bottomFirstThreshold = 55;
	var _bottomSecondThreshold = 63;
	var _firstTopBarYCoor = '35.5%';
	var _secondTopBarYCoor = '30.9%';
	var _firstBottomBarYCoor = '64.5%';
	var _secondBottomBarYCoor = '68.7%'

	/****************************************
	 *				GAME CONTROL			*
	 ****************************************/

	//Pick a note duration and clef for the new question. Reset old correct answer and old respond.
	this.gameStart = function(){
		_noteDuration = _getRandomNoteDuration();
		_clefUsed = _getRandomClef();
		_correctAnswer = "";
		var respond = angular.element(document.querySelector("respond"));
		respond.remove();
	};

	//Get a random Clef.
	var _getRandomClef = function(){
		return _clefName[Math.floor(Math.random() * _clefName.length)];
	}

	//Get a random note duration.
	var _getRandomNoteDuration = function(){
		var randomImage = Math.floor(Math.random() * 5 + 1);
		return  'url(img/Note/' + randomImage + '.png)';
	}

	//Register correct answer for this question. (This function is called when construct question.)
	this.setCorrectAnswer = function(cAnswer){
		_correctAnswer = cAnswer;
	}
	//Verify the answer click. Call _endQuestionHandler to construct UI respond for controller.
	this.isCorrectAnswer = function(value){
		if(value == _correctAnswer){
			_endQuestionHandler(true);
			return true;
		}
		else 
		{
			_endQuestionHandler(false);
			return false;
		}	
	};	

	/***************************************
	 *		GET METHODS FOR FRONT END      *
	 ***************************************/

	//Return clef used to controller.
	this.getClefUsed = function(){
		return _clefUsed;
	};
	//Return question respond (UI element) to controller.
	this.getQuestionRespond = function(){
		return _questionRespond;
	};
	//Return note duration used for this question.
	this.getNoteDuration = function(){
		return _noteDuration;
	};
	this.getQuestionText = function(category){
		var result = "<p>" + category + "</p>"
		return result;
	};

	/****************************************
	 *				UI CONTROL				*
	 ****************************************/

	//Add extra bar on top or bottom when nessessary. 
	this.addExtraLine = function(xCoor, yCoor){
		var questionBox = angular.element(document.querySelector('div[id=questionBox]'));
		var extraLine = "";

		//Check top Threshold
		if(yCoor < _topFirstThreshold){
			extraLine = "<div class='extraline' style='left:" + xCoor + "%; top:" + _firstTopBarYCoor + "'></div>";
			questionBox.append(extraLine); 
			if(yCoor < _topSecondThreshold){
				extraLine = "<div class='extraline' style='left:" + xCoor + "%; top:" + _secondTopBarYCoor + "'></div>";
				questionBox.append(extraLine); 
			}
		}
		//Bottom Threshold
		if(yCoor > _bottomFirstThreshold){
			extraLine = "<div class='extraline' style='left:" + xCoor + "%; top:" + _firstBottomBarYCoor + "'></div>";
			questionBox.append(extraLine); 
			if(yCoor > _bottomSecondThreshold){
				extraLine = "<div class='extraline' style='left:" + xCoor + "%; top:" + _secondBottomBarYCoor + "'></div>";
				questionBox.append(extraLine); 
			}
		}
	}
	
	//Construct respond base on value of answer click.
	var _endQuestionHandler = function(flag){
		if(flag)
			_questionRespond = "<respond type=" + _rightRespond + "></respond>";
		else
			_questionRespond = "<respond type=" + _wrongRespond + "></respond>";
	}
	
	

	
})