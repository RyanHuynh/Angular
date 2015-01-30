var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var app = express();
var port = process.env.PORT || 3000;
var router = express.Router();

mongoose.connect('mongodb://localhost:27017/card-collections');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));


// router.use(function(req, res, next){
// 	console.log('Something is happening.');
// 	next();
// });

// router.get('/', function(req, res){
// 	res.json({ message: "Welcome"});
// });

app.use('/api', router);

//Define Schema
var Schema = mongoose.Schema;
var ThemeSchema = new Schema({
	data : [{id: Number,  value : String , background : String, count: Number }]
});
//Define model for each type of themes
var Identical = mongoose.model('Identical', ThemeSchema);
var FaceName = mongoose.model('FaceName', ThemeSchema);

router.route('/themes/:theme_type')
	.post(function(req, res){
		var type = req.params.theme_type;
		var theme = "";
		if(type == "identical"){
			theme = new Identical();
		}
		else if(type == "facename"){
			theme = new FaceName();
		}

		theme.data = [  { value : "1", background: "img/Themes/Identical/sanimals/bunny.jpg", count : 2 },
                        { value : "2", background: "img/Themes/Identical/sanimals/chicken.jpeg", count : 2 },
                        { value : "3", background: "img/Themes/Identical/sanimals/hedgehog.jpeg", count : 2 },
                        { value : "4", background: "img/Themes/Identical/sanimals/panda.jpg", count : 2 },
                        { value : "5", background: "img/Themes/Identical/sanimals/squirrel.jpg", count : 2 },
                        { value : "6", background: "img/Themes/Identical/sanimals/kitty.jpeg", count : 2 },
                        { value : "7", background: "img/Themes/Identical/sanimals/puppy.jpeg", count : 2 },
                        { value : "8", background: "img/Themes/Identical/sanimals/tiger.jpeg", count : 2 }];

		//save the theme
		theme.save(function(err){
			if(err)
				res.send(err);

			res.json({ message: 'Theme created' });
		});	
	})
	.get(function(req, res){
		Identical.find(function(err, themes){
			if(err)
				res.send(err);
			res.json(themes);
		});
	});

// router.route('/bears/:bear_id')
// 	.get(function(req, res){
// 		Bear.findById(req.params.bear_id, function(err, bear){
// 			if(err)
// 				res.send(err);
// 			res.json(bear);
// 		});
// 	})
// 	.put(function(req, res){
// 		Bear.findById(req.params.bear_id, function(err, bear){
// 			if(err)
// 				res.send(err);

// 			bear.name = req.body.name;
// 			bear.job = "random Job";

// 			bear.save(function(err){
// 				if(err){
// 					res.send(err);
// 				}

// 				res.json({ message: 'Bear updated!'})
// 			});
// 		});
// 	});


app.listen(port);
console.log('App is listening in port ' + port);