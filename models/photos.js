const mongoose = require('mongoose');


const PhotosSchema = mongoose.Schema({
	imageTitle:{
		type: String,
		required : true
	},
	imageLocation:{
		type: String,
		required : true
	}
});

const Photos = module.exports = mongoose.model('Photos', PhotosSchema);