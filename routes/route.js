const express = require('express');
const router = express.Router();
const multer = require('multer');
const Photos = require('../models/photos');
const Users = require('../models/users');
// const  multipart  =  require('connect-multiparty');
// const  multipartMiddleware  =  multipart({ uploadDir:  '../angular-paperparadise/src/assets/images' });

// let upload = multer({ dest: './angular-paperparadise/src/assets/images/'});

// var multer = require('multer');
var path = require('path')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './angular-paperparadise/src/assets/images/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)) //Appending extension
  }
})

var upload = multer({ storage: storage });

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
// router.post('/addphoto', multipartMiddleware, (req, res, next)=>{
// 	let newPhoto = new Photos({
// 		imageTitle: req.body.imageTitle,
// 		imageLocation: req.body.cardfile.name
// 		//imageLocation: req.body.imageLocation
// 	});

// 	newPhoto.save((err, photos)=>{
// 		if(err)
// 		{
// 			res.json({msg: 'Failed to add photo'});
// 		}
// 		else{
// 			res.json({msg: 'Photo added'});
// 		}
// 	});
// });
 
router.post('/addphoto', upload.single('file'), (req, res, next)=>{
	console.log('adding foto only');
	const file = req.file;
	console.log("filename->"+file.filename);
	console.log("imageTitle->"+req.body.imageTitle);
	
	if(!file) {
		const error = new Error('Pls upload a file');
		error.httpStatusCode = 400;
		return next(error);
	}

	let newPhoto = new Photos({
		imageTitle: req.body.imageTitle,
		imageLocation: file.filename
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
	// res.send(file);
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
router.post('/updatetitle',(req, res, next)=>{
	console.log("new");
	console.log("id->"+req.body);
	console.log("titlw->"+req.body.imgtitle);
	Photos.updateOne({
		_id:req.body.id
	 }, {
		$set: {
				"imageTitle": req.body.imgtitle
			}
		}, function(err, results) {
			res.json(results.result);
	});
});


//login api
router.post('/loginsys', (req, res, next)=>{
	console.log("req->"+req.body.usrname);
	Users.find({username: req.body.usrname, password: req.body.pwd}, function(err, result){
		console.log("username->"+req.body.usrname);
		console.log("password->"+req.body.pwd);
		if(err){
			res.json(err);
		}
		else{
			if(result.length>0){
				res.json(200);
			}else{
				res.json(404);
			}
			
		}
	});

});

//registration api

router.post('/adduser', (req, res, next)=>{

	let newUser = new Users({
		username: req.body.username,
		password:  req.body.password
		//imageLocation: req.body.imageLocation
	});

	newUser.save((err, users)=>{
		if(err)
		{
			res.json({msg: 'Failed to add user'});
		}
		else{
			res.json({msg: 'Users added'});
		}
	});
	// res.send(file);
});

//retrieving all users

router.get('/allusers', (req, res, next)=>{
	// res.send('Retrieving photos');
	Users.find(function(err, users){
		res.json(users);
	})
});

module.exports = router;

