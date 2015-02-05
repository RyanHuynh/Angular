var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var app = express();
var port = process.env.PORT || 2000;
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
	data : [{ value : String , background : String, count: Number }]
});

router.route('/themes/:theme_type')
	.post(function(req, res){
		//Define our model with theme
		var Model = mongoose.model(req.params.theme_type, ThemeSchema);
		var theme = new Model ();
		theme.data = req.body;
		//console.log(theme.data);
		// theme.data = [  { value : '1', background: 'img/Themes/Shape/shape2/a1.jpg', count : 1 },
  //                       { value : "1", background: "img/Themes/Shape/shape2/a2.jpg", count : 1 },
  //                       { value : "2", background: "img/Themes/Shape/shape2/b1.jpg", count : 1 },
  //                       { value : "2", background: "img/Themes/Shape/shape2/b2.jpg", count : 1 },
  //                       { value : "3", background: "img/Themes/Shape/shape2/c1.jpg", count : 1 },
  //                       { value : "3", background: "img/Themes/Shape/shape2/c2.jpg", count : 1 },
  //                       { value : "4", background: "img/Themes/Shape/shape2/d1.jpg", count : 1 },
  //                       { value : "4", background: "img/Themes/Shape/shape2/d2.jpg", count : 1 },
		// 				{ value : "5", background: "img/Themes/Shape/shape2/e1.jpg", count : 1 },
  //                       { value : "5", background: "img/Themes/Shape/shape2/e2.jpg", count : 1 },
  //                       { value : "6", background: "img/Themes/Shape/shape2/f1.jpg", count : 1 },
  //                       { value : "6", background: "img/Themes/Shape/shape2/f2.jpg", count : 1 },
  //                       { value : "7", background: "img/Themes/Shape/shape2/g1.jpg", count : 1 },
  //                       { value : "7", background: "img/Themes/Shape/shape2/g2.jpg", count : 1 },
  //                       { value : "8", background: "img/Themes/Shape/shape2/h1.jpg", count : 1 },
  //                       { value : "8", background: "img/Themes/Shape/shape2/h2.jpg", count : 1 }];

		//save the theme
		theme.save(function(err){
			if(err)
				res.json({ message: 'error' });

			res.json({ message: 'Theme created' });
		});	
	})
	.get(function(req, res){
		var Theme = mongoose.model(req.params.theme_type, ThemeSchema);
		Theme.find(function(err, themes){
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