app.service('ChordService', function(NoteService, GameControlService){
	var _chordList = [ 	{ Name: "CM",
						Notes : ["C","E","G"] },
						{ Name: "CsM",
						Notes : ["Cs","Es","Gs"] },
						{ Name: "DbM",
						Notes : ["Db","F","Ab"] },
						{ Name: "DM",
						Notes : ["D","Fs","A"] },
						{ Name: "DsM",
						Notes : ["Ds","Fx","As"] },
						{ Name: "EbM",
						Notes : ["Eb","G","Bb"] },
						{ Name: "EM",
						Notes : ["E","Gs","B"] },
						{ Name: "FM",
						Notes : ["F","A","C"] },
						{ Name: "FsM",
						Notes : ["Fs","As","Cs"] },
						{ Name: "GbM",
						Notes : ["Gb","Bb","Db"] },
						{ Name: "GM",
						Notes : ["G","B","D"] },
						{ Name: "GsM",
						Notes : ["Gs","Bs","Ds"] },
						{ Name: "AbM",
						Notes : ["Ab","C","Eb"] },
						{ Name: "AM",
						Notes : ["A","Cs","E"] },
						{ Name: "AsM",
						Notes : ["As","Cx","Es"] },
						{ Name: "BbM",
						Notes : ["Bb","D","F"] },
						{ Name: "BM",
						Notes : ["B","Ds","Fs"] },

						{ Name: "Cmin",
						Notes : ["C","Eb","G"] },
						{ Name: "Csmin",
						Notes : ["Cs","E","Gs"] },
						{ Name: "Dbmin",
						Notes : ["Db","Fb","Ab"] },
						{ Name: "Dmin",
						Notes : ["D","F","A"] },
						{ Name: "Dsmin",
						Notes : ["Ds","Fs","As"] },
						{ Name: "Ebmin",
						Notes : ["Eb","Gb","Bb"] },
						{ Name: "Emin",
						Notes : ["E","G","B"] },
						{ Name: "Fmin",
						Notes : ["F","Ab","C"] },
						{ Name: "Fsmin",
						Notes : ["Fs","A","Cs"] },
						{ Name: "Gbmin",
						Notes : ["Gb","Bbb","Db"] },
						{ Name: "Gmin",
						Notes : ["G","Bb","D"] },
						{ Name: "Abmin",
						Notes : ["Ab","Cb","Eb"] },
						{ Name: "Amin",
						Notes : ["A","C","E"] },
						{ Name: "Asmin",
						Notes : ["As","Cs","Es"] },
						{ Name: "Bbmin",
						Notes : ["Bb","Db","F"] },
						{ Name: "Bmin",
						Notes : ["B","D","Fs"] }];
	var _chordNameList = ["CM", "CsM", "DbM", "DM", "DsM", "EbM", "EM", "FM", "FsM", "GbM", "GM", "GsM", "AbM", "AM", "AsM", "BbM", "BM",
						"Cmin", "Csmin", "Dbmin", "Dmin", "Dsmin", "Ebmin", "Emin", "Fmin", "Fsmin", "Gbmin", "Gmin", "Abmin", "Amin", "Asmin", "Bbmin", "Bmin"];
	var _xDistanceBetweenNote = 17;
	var _firstNoteXCoord = 30;
	var _firstNoteLowestInterval = 45;
	var _correctAnswerIndex = "";
	
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

	this.getQuestion = function(){
		var result = [];

		//Pick a random chord.
		var randomChordIndex = Math.floor(Math.random() * _chordNameList.length);
		var randomChordName = _chordNameList[randomChordIndex];
		var randomChord = "";
		for(i = 0; i < _chordList.length; i++){
			var choord = _chordList[i];
			if(choord.Name == randomChordName){
				randomChord = choord;
				break;
			}
		}
		console.log(randomChordName);
		//Get root, 3rd and 5th note.
		var rootName = randomChord.Notes[0];
		var root = NoteService.getNoteWithName(rootName);
		var _3rdNoteName = randomChord.Notes[1];
		var _3rdNote = NoteService.getNoteWithName(_3rdNoteName);
		var _5thNoteName = randomChord.Notes[2];
		var _5thNote = NoteService.getNoteWithName(_5thNoteName);

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