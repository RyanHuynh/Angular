app.service('NoteService', function(){

	//Get resource
	var C = {	Name: "C",
				Key: ["C", "G", "F", "Bb", "Eb", "Ab", "Db"],
				CoorY: { G: [18, 45] , F : [25,0] }};
	var Cs = {	Name: "Cs",
				Key: ["D", "A", "E", "B", "Fs"],
				CoorY: { G: [18, 45] , F : [25,0] }};
	var Db = {	Name: "Db",
				Key: ["Ab", "Db", "Gb"],
				CoorY: { G: [40, 14] , F : [47,22,-4] }};
	var D = {	Name: "D",
				Key: ["C", "G", "D", "A", "F", "Bb", "Eb"],
				CoorY: { G: [40, 14] , F : [47,22,-4] }};
	var Ds = {	Name: "Ds",
				Key: ["E", "B", "Fs"],
				CoorY: { G: [40, 14] , F : [47,22,-4] }};
	var Eb = { 	Name: "Eb",
				Key: ["Bb", "Eb", "Ab", "Db", "Gb"],
				CoorY: { G: [37, 10] , F : [45,18] }};
	var E = { 	Name: "E",
				Key: ["C", "G", "D", "A", "E", "B", "F"],
				CoorY: { G: [37, 10] , F : [45,18] }};
	var F = {	Name: "F",
				Key: ["C", "F", "Bb", "Eb", "Ab", "Db"],
				CoorY: { G: [33, 6.3] , F : [40,14] }};		
	var Fs = {	Name: "Fs",
				Key:["G", "D", "A", "E", "B", "Fs"],
				CoorY: { G: [33, 6.3] , F : [40,14] }};
	var Gb = { 	Name: "Gb",
				Key: ["Db", "Gb"],
				CoorY: { G: [29, 3.3] , F : [37.3,10.3] }};
	var G = { 	Name: "G",
				Key: ["C", "G", "D", "F", "Bb", "Eb", "Ab"],
				CoorY: { G: [29, 3.3] , F : [37.3,10.3] }};
	var Gs = { 	Name: "Gs",
				Key: ["A", "E", "B", "Fs"],
				CoorY: { G: [29, 3.3] , F : [37.3,10.3] }};
	var Ab = {	Name: "Ab",
				Key: ["Eb", "Ab", "Db", "Gb"],
				CoorY: { G: [25, 0] , F : [33,6.5] }};
	var A = {	Name: "A",
				Key: ["C", "G", "D", "A", "E", "F", "Bb"],
				CoorY: { G: [25, 0] , F : [33,6.5] }};
	var As = {	Name: "As",
				Key: ["B", "Fs"],
				CoorY: { G: [25, 0] , F : [33,6.5] }};
	var B = { 	Name: "B",
				Key: ["C", "G", "D", "A", "E", "B"],
				CoorY: { G: [47,22, -4] , F : [29,3.3] }};
	var Bb = { 	Name: "Bb",
				Key: ["F", "Bb", "Eb", "Ab", "Db", "Gb"],
				CoorY: { G: [47,22, -4] , F : [29,3.3] }};
	var noteList = [C, Cs, Db, D, Ds, Eb, E, F, Fs, Gb, G, Gs, Ab, A, As, B, Bb];

	this.getNoteWithName = function(noteName){
		var result = "";
		for(i = 0; i < noteList.length; i++){
			var note = noteList[i];
			if(note.Name == noteName){
				result = note;
				break;
			}
		}
		return result;
	};
});