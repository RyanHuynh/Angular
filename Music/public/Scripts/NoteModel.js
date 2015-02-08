/* Note Model : transport Note/Chord model to services. */
app.service('NoteModel', function(){

	/************************************
	 *			  RESOURCES	    		*
	 ************************************/

	//Note models.
	var C = {	Name: "C",
				Accidential : "none",
				Key: ["C", "G", "F", "Bb", "Eb", "Ab", "Db"],
				CoorY: { G: [40.5,25,9.5] , F : [45,29,14] }};
	var Cb= {	Name: "Cb",
				Accidential : "none",
				Key: [],
				CoorY: { G: [40.5,25,9.5] , F : [45,29,14] }};
	var Cx = {	Name: "Cx",
				Accidential : "x",
				Key: [],
				CoorY: { G: [40.5,25,9.5] , F : [45,29,14] }};
	var Cs = {	Name: "Cs",
				Accidential : "s",
				Key: ["D", "A", "E", "B", "Fs"],
				CoorY: { G: [40.5,25,9.5] , F : [45,29,14] }};
	var Db = {	Name: "Db",
				Accidential : "f",
				Key: ["Ab", "Db", "Gb"],
				CoorY: { G: [38,23,7.5] , F : [42.7,27,11.5] }};
	var D = {	Name: "D",
				Accidential : "none",
				Key: ["C", "G", "D", "A", "F", "Bb", "Eb"],
				CoorY: { G: [38,23,7.5] , F : [42.7,27,11.5] }};
	var Ds = {	Name: "Ds",
				Accidential : "s",
				Key: ["E", "B", "Fs"],
				CoorY: { G: [38,23,7.5] , F : [42.7,27,11.5] }};
	var Eb = { 	Name: "Eb",
				Accidential : "f",
				Key: ["Bb", "Eb", "Ab", "Db", "Gb"],
				CoorY: { G: [36,20.5] , F : [40.5,25,9.5] }};
	var E = { 	Name: "E",
				Accidential : "none",
				Key: ["C", "G", "D", "A", "E", "B", "F"],
				CoorY: { G: [36,20.5] , F : [40.5,25,9.5] }};
	var Es = { 	Name: "Es",
				Accidential : "s",
				Key: [],
				CoorY: { G: [36,20.5] , F : [40.5,25,9.5] }};
	var F = {	Name: "F",
				Accidential : "none",
				Key: ["C", "F", "Bb", "Eb", "Ab", "Db"],
				CoorY: { G: [33,18] , F : [38,23,7.5] }};		
	var Fx = {	Name: "Fx",
				Accidential : "x",
				Key:[],
				CoorY: { G: [33,18] , F : [38,23,7.5] }};
	var Fs = {	Name: "Fs",
				Accidential : "s",
				Key: ["G","D","A","E","B","Fs"],
				CoorY: { G: [33,18] , F : [38,23,7.5] }};		
	var Fb = {	Name: "Fb",
				Accidential : "f",
				Key: [],
				CoorY: { G: [33,18] , F : [38,23,7.5] }};		
	var Gb = { 	Name: "Gb",
				Accidential : "f",
				Key: ["Db", "Gb"],
				CoorY: { G: [47.5,31,16] , F : [36,20.5] }};
	var G = { 	Name: "G",
				Accidential : "none",
				Key: ["C", "G", "D", "F", "Bb", "Eb", "Ab"],
				CoorY: { G: [47.5,31,16] , F : [36,20.5] }};
	var Gs = { 	Name: "Gs",
				Accidential : "s",
				Key: ["A", "E", "B", "Fs"],
				CoorY: { G: [47.5,31,16] , F : [36,20.5] }};
	var Ab = {	Name: "Ab",
				Accidential : "f",
				Key: ["Eb", "Ab", "Db", "Gb"],
				CoorY: { G: [45,29,14] , F : [33,18] }};
	var A = {	Name: "A",
				Accidential : "s",
				Key: ["C", "G", "D", "A", "E", "F", "Bb"],
				CoorY: { G: [45,29,14] , F : [33,18] }};
	var As = {	Name: "As",
				Accidential : "s",
				Key: ["B", "Fs"],
				CoorY: { G: [45,29,14] , F : [33,18] }};
	var B = { 	Name: "B",
				Accidential : "none",
				Key: ["C", "G", "D", "A", "E", "B"],
				CoorY: { G: [42.7,27,11.5] , F : [48,31,16] }};
	var Bb = { 	Name: "Bb",
				Accidential : "f",
				Key: ["F", "Bb", "Eb", "Ab", "Db", "Gb"],
				CoorY: { G: [42.7,27,11.5] , F : [47.5,31,16] }};
	var Bs = { 	Name: "Bs",
				Accidential : "s",
				Key: [],
				CoorY: { G: [42.7,27,11.5] , F : [47.5,31,16] }};
	var Bbb = { Name: "Bbb",
				Accidential : "bb",
				Key: [],
				CoorY: { G: [42.7,31,11.5] , F : [47.5,31,16] }};
	var _noteList = [C, Cb, Cs, Cx, Db, D, Ds, Eb, E, Es, F, Fs, Fx, Fb, Gb, G, Gs, Ab, A, As, B, Bb, Bs, Bbb];

	//Chord Model.
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

	//Return Note with input name.
	this.getNoteWithName = function(noteName){
		var result = "";
		for(i = 0; i < _noteList.length; i++){
			var note = _noteList[i];
			if(note.Name == noteName){
				result = note;
				break;
			}
		}
		return result;
	};

	//return Chord with input chord name.
	this.getChordWithName = function(chordName){
		var result = "";
		for(i = 0; i < _chordList.length; i++){
			var chord = _chordList[i];
			if(chord.Name == chordName){
				result = chord;
				break;
			}
		}
		return result;
	};
});