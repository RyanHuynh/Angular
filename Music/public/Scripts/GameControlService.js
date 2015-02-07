app.service('GameControlService', function(){
	var _noteDuration = "";
	var _clefUsed = "";
	var _clefName = ["G", "F"];
	var _correctAnswer = "";
	var _questionRespond = "";

	//Variables used in respond function
	var _rightRespond = "R";
	var _wrongRespond = "W";

	//Variable used for adding extra bar.
	var _topFirstThreshold = 16;
	var _topSecondThreshold = 11;
	var _bottomFirstThreshold = 39;
	var _bottomSecondThreshold = 44;
	var _firstTopBarYCoor = '21.5%';
	var _secondTopBarYCoor = '17%';
	var _firstBottomBarYCoor = '47.5%';
	var _secondBottomBarYCoor = '52%'

	this.test = 1;

	this.gameStart = function(){
		_noteDuration = _getRandomNoteDuration();
		_clefUsed = _getRandomClef();
		_correctAnswer = "";
		var respond = angular.element(document.querySelector("respond"));
		respond.remove();
	};

	//
	this.addExtraLine = function(xCoor, yCoor){
		var questionBox = angular.element(document.querySelector('div[id=questionBox]'));
		var extraLine = "";

		//Check top threshold
		if(yCoor < _topFirstThreshold){
			extraLine = "<div class='extraline' style='left:" + xCoor + "%; top:" + _firstTopBarYCoor + "'></div>";
			questionBox.append(extraLine); 
			if(yCoor < _topSecondThreshold){
				extraLine = "<div class='extraline' style='left:" + xCoor + "%; top:" + _secondTopBarYCoor + "'></div>";
				questionBox.append(extraLine); 
			}
		}
		if(yCoor > _bottomFirstThreshold){
			extraLine = "<div class='extraline' style='left:" + xCoor + "%; top:" + _firstBottomBarYCoor + "'></div>";
			questionBox.append(extraLine); 
			if(yCoor > _bottomSecondThreshold){
				extraLine = "<div class='extraline' style='left:" + xCoor + "%; top:" + _secondBottomBarYCoor + "'></div>";
				questionBox.append(extraLine); 
			}
		}
		
	}
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
	var _endQuestionHandler = function(flag){
		if(flag)
			_questionRespond = "<respond type=" + _rightRespond + "></respond>";
		else
			_questionRespond = "<respond type=" + _wrongRespond + "></respond>";
	}
	this.getQuestionRespond = function(){
		return _questionRespond;
	}
	var _getRandomNoteDuration = function(){
		var randomImage = Math.floor(Math.random() * 5 + 1);
		return  'url(img/Note/' + randomImage + '.png)';
	}

	this.getNoteDuration = function(){
		return _noteDuration;
	}

	var _getRandomClef = function(){
		return _clefName[Math.floor(Math.random() * _clefName.length)];
	}

	this.getClefUsed = function(){
		return _clefUsed;
	}
	this.setCorrectAnswer = function(cAnswer){
		_correctAnswer = cAnswer;
	}
})