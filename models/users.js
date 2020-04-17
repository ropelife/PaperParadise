const mongoose = require('mongoose');


const UsersSchema = mongoose.Schema({
	username:{
		type: String,
		required : true
	},
	password:{
		type: String,
		required : true
	}
});

const Users = module.exports = mongoose.model('Users', UsersSchema);