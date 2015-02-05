app.service('NameNoteService', function(NoteService){
	//
	var noteNameList = ["C", "Cs", "Db", "D", "Ds", "Eb", "E", "F", "Fs", "Gb", "G", "Gs", "Ab", "A", "As", "B", "Bb"];
	var clefName = ["G", "F"];
	var clefUsed = "";
	var keyUsed = "";
	var correctAnswerIndex = "";
	var correctAnswer = "";
	var noteList = NoteService.getNote
	//
	this.getQuestion = function(){
		var randomIndex = Math.floor(Math.random() * noteNameList.length);
		var noteName = noteNameList[randomIndex];
		var choosenNote = NoteService.getNoteWithName(noteName);

		//Choose Clef
		clefUsed = clefName[Math.floor(Math.random() * 2)];
		var choosenNoteArray = "";
		if(clefUsed == "G"){
			choosenNoteArray = choosenNote.CoorY.G;
		}
		else
			choosenNoteArray = choosenNote.CoorY.F;
		
		//Get key signature.
		var randomKeyIndex = Math.floor(Math.random() * choosenNote.Key.length);
		keyUsed = choosenNote.Key[randomKeyIndex];

		//Get note coordination.
		var x = '50';
		var randomNoteIndex = Math.floor(Math.random() * choosenNoteArray.length);
		var y = choosenNoteArray[randomNoteIndex];
		var note = "<note x=" + x + " y=" + y + "></note>";

		//Set correct answer
		correctAnswerIndex = randomIndex;
		correctAnswer = noteName;
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
			firstIndex = Math.floor(Math.random() * noteNameList.length);
		}while( firstIndex == secondIndex || firstIndex == thirdIndex || firstIndex == correctAnswerIndex);
		var answer = '<answer value=' + noteNameList[firstIndex] + ' ></answer>';
		resultSet.push(answer);
		//Second wrong answer.
		do{
			secondIndex = Math.floor(Math.random() * noteNameList.length);
		}while( secondIndex == firstIndex || secondIndex == thirdIndex || secondIndex == correctAnswerIndex);
		answer = '<answer value=' + noteNameList[secondIndex] + ' ></answer>';
		resultSet.push(answer);
		//Third wrong answer.
		do{
			thirdIndex = Math.floor(Math.random() * noteNameList.length);
		}while( thirdIndex == secondIndex || thirdIndex == firstIndex || thirdIndex == correctAnswerIndex);
		answer = '<answer value=' + noteNameList[thirdIndex] + ' ></answer>';
		resultSet.push(answer);

		//Add correct answer
		var cAnswer = '<answer value=' + correctAnswer + ' ></answer>';
		var randomInsertIndex = Math.floor(Math.random() * 4);
		resultSet.splice(randomInsertIndex, 0, cAnswer);

		return resultSet;

	}

	this.checkAnswer = function(value){
		if(value == correctAnswer){
			return true;
		}
		else
			return false;
	};	
});