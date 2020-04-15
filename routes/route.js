const express = require('express');
const router = express.Router();

const Photos = require('../models/photos');
const  multipart  =  require('connect-multiparty');
const  multipartMiddleware  =  multipart({ uploadDir:  '../angular-paperparadise/src/assets/images' });

router.get('/allphotos', (req, res, next)=>{
	// res.send('Retrieving photos');
	Photos.find(function(err, photos){
		res.json(photos);
	})
});

//fetching for one id
router.get('/photo/:id', (req, res, next)=>{
	Photos.find({_id: req.params.id}, function(err, result){
		if(err){
			res.json(err);
		}
		else{
			res.json(result);
		}
	});
});

//add photos
router.post('/addphoto', multipartMiddleware, (req, res, next)=>{
	let newPhoto = new Photos({
		imageTitle: req.body.imageTitle,
		imageLocation: req.body.cardfile.name
		//imageLocation: req.body.imageLocation
	});

	newPhoto.save((err, photos)=>{
		if(err)
		{
			res.json({msg: 'Failed to add photo'});
		}
		else{
			res.json({msg: 'Photo added'});
		}
	});
});

//delete photos
router.delete('/deletephoto/:id',(req, res, next)=>{
	
	Photos.remove({_id: req.params.id}, function(err, result){
		if(err)
		{
			res.json(err);
		}
		else{
			res.json(result);
		}
	});
});

//update photos
router.put('/updatetitle/:id',(req, res, next)=>{
	Photos.updateOne({
		_id:req.params.id
	 }, {
		$set: {
				"imageTitle": "Owl Love"
			}
		}, function(err, results) {
			res.json(results.result);
	});
});


module.exports = router;

