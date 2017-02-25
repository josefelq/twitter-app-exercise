var express = require('express');
var router = express.Router();
var mongodb =require('mongodb');
var db=require('../public/scripts/server');


router.get('/', function(req, res, next) {
    
    var collection = db.get().collection('tweets');

    collection.find().toArray(function(err, result) {
        if(err){
            console.log('oh oh oreos!');
        }
        else if(result.length){
            res.render('index', {
                "tweets": result
            });
        }
        else{
            res.send('No tweets found :(');
        }
    });

});

router.post('/tweets', function(req, res, next) {
    
    var collection = db.get().collection('tweets')

    collection.deleteMany({}, function(error, result){
				if(error){
					console.log(error);
				}
				else{
					collection.insert(req.body), function(error, result){
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
});


module.exports = router;
