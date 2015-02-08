/* Chord Service: Handles "Chord" game mode functionality */
app.service('ChordService', function(NoteModel, GameControlService){

	/****************************************
	 *				 VARIABLES		    	*
	 ****************************************/

	//Chord names (olny has Major and Minor Chord)
	var _chordNameList = ["CM", "CsM", "DbM", "DM", "DsM", "EbM", "EM", "FM", "FsM", "GbM", "GM", "GsM", "AbM", "AM", "AsM", "BbM", "BM",
						"Cmin", "Csmin", "Dbmin", "Dmin", "Dsmin", "Ebmin", "Emin", "Fmin", "Fsmin", "Gbmin", "Gmin", "Abmin", "Amin", "Asmin", "Bbmin", "Bmin"];
	
	//Default value/setting.
	var _xDistanceBetweenNote = 17;
	var _firstNoteXCoord = 30;
	var _firstNoteLowestInterval = 45;
	var _correctAnswerIndex = "";

	
	/****************************************
	 *			COMMON FUNCTIONS		   	*
	 ****************************************/

	//Return random chord inversion.
	var _getChordInversion = function (root, _3rdnote, _5thnote){
		var randomChordInversion = Math.floor(Math.random() * 6);
		//Root position.
		if(randomChordInversion == 0)
			return [root, _3rdnote, _5thnote];
		if(randomChordInversion == 1)
			return [root, _5thnote, _3rdnote];
		
		//First Inversion
		if(randomChordInversion == 2)
			return [_3rdnote, root, _5thnote];
		if(randomChordInversion == 3)
			return [_3rdnote, _5thnote, root];
		
		//Second Inversion.
		if(randomChordInversion == 4)
			return [_5thnote, _3rdnote, root];
		if(randomChordInversion == 5)
			return [_5thnote, root ,_3rdnote];
	}

	//Construct random question.
	this.getQuestion = function(){
		var result = [];

		//Pick a random chord.
		var randomChordIndex = Math.floor(Math.random() * _chordNameList.length);
		var randomChordName = _chordNameList[randomChordIndex];
		var randomChord = NoteModel.getChordWithName(randomChordName);

		//console.log(randomChordName);
		//Get root, 3rd and 5th note.
		var rootName = randomChord.Notes[0];
		var root = NoteModel.getNoteWithName(rootName);
		var _3rdNoteName = randomChord.Notes[1];
		var _3rdNote = NoteModel.getNoteWithName(_3rdNoteName);
		var _5thNoteName = randomChord.Notes[2];
		var _5thNote = NoteModel.getNoteWithName(_5thNoteName);

		//Get choosen clef.
		var clefUsed = GameControlService.getClefUsed();
		
		//Construct notes.
		var noteArray = _getChordInversion(root, _3rdNote, _5thNote);
		var lowestYCoord = _firstNoteLowestInterval;
		for(i = 0; i < noteArray.length; i++){
			var currentNote = noteArray[i];
			var noteName = currentNote.Name;
			var xCoord = _firstNoteXCoord + _xDistanceBetweenNote * i;
			var yCoord = "";
			var interval = 0;
			if(clefUsed == "G"){
				do{
					yCoord = currentNote.CoorY.G[interval];
					interval++;
				}while(yCoord > lowestYCoord);
				lowestYCoord = yCoord;
			}
			else{
				do{
					yCoord = currentNote.CoorY.F[interval];
					interval++;
				}while(yCoord > lowestYCoord);
				lowestYCoord = yCoord;
			}
			lowestYCoord = yCoord;
			var accidential = currentNote.Accidential;
			var note = "<note value=" + noteName + " x=" + xCoord + " y=" + yCoord + " acc=" + accidential + "></note>";
			result.push(note);
		}

		//Set correct answer here
		_correctAnswerIndex = randomChordIndex;
		GameControlService.setCorrectAnswer(randomChordName);
		return result;
	}

	//Get random answer set.
	this.getAnswerSet = function (){
		var resultSet = [];

		//Get 3 wrong answers first
		for(i = 1; i <= 3; i++){
			var currentChordIndex = (_correctAnswerIndex + 2 * i) % _chordNameList.length;
			var currentChordName = _chordNameList[currentChordIndex];
			var currentChord = "<answer value=" + currentChordName + " type='Chord'></answer>";
			resultSet.push(currentChord);
		}

		//Get the correct answer
		var correctAnswerName = _chordNameList[_correctAnswerIndex];
		var correctAnswer = "<answer value=" + correctAnswerName + " type='Chord'></answer>";
		var correctAnswerRandomIndex = Math.floor(Math.random() * 4);
		resultSet.splice(correctAnswerRandomIndex, 0, correctAnswer);

		return resultSet;
	}
});