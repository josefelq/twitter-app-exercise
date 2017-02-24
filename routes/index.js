var express = require('express');
var router = express.Router();
var mongodb =require('mongodb');


router.get('/', function(req, res, next) {
var MongoClient = mongodb.MongoClient;

	var url = 'mongodb://localhost:27017/test';
	
	MongoClient.connect(url, function(err, db){
		if(err){}
		else{
			console.log("Connection established!");
			
			var collection =db.collection('tweets');
			
			collection.find({}).toArray(function(err, result){
				if(err){
					res.send(err);
				}
				else if(result.length){
					res.send(result);
				}
				else{
					res.send('No tweets found');	
				}
				db.close();
			});
		}
	});

});

router.post('/', function(req, res, next) {
var MongoClient = mongodb.MongoClient;

	var url = 'mongodb://localhost:27017/test';
	
	MongoClient.connect(url, function(err, db){
		if(err){}
		else{
			console.log("Connection established!");
			
			var collection =db.collection('tweets');
			
			collection.deleteMany({}, function(error, result){
				if(error){
					console.log(error);
				}
				else{
					collection.insert(req.body, function(error, result){
						if(error){
							console.log(error);
							res.status(500).json({error: 'Oops!'});

						}
						else{
							console.log(result);
							res.status(200).json(req.body);
						}
					});
				}
				
			});
		}
	});

});

module.exports = router;
