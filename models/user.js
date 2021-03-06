const mongoose = require('mongoose');
const { v1: uuidv1 } = require('uuid');
// import { v1 as uuidv1 } from 'uuid';
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
	name:{
		type : String,
		trim : true,
		require: true,
	},
	email:{
		type : String,
		trim : true,
		require: true,
	},
	hashed_password:{
		type : String,
		trim : true,
		require: true,
	},
	salt : String, // some complicated random string
	created:{
		type:Date,
		default : Date.now
	},
	updated: Date
});

//virtual field for passwords
userSchema.virtual('password')
.set(function(password){
	//create temporary variable called _password
	this._password = password
	// generate a timestamp 
	this.salt = uuidv1()
	//encrypt password
	this.hashed_password = this.encryptPassword(password)

})
.get(function(){
	return this._password;
});

// methods 

userSchema.methods={
	authenticate: function(plainText){
		return this.encryptPassword(plainText) === this.hashed_password
	},


	encryptPassword: function(password){
		if(!password) return "";
		try {
          return crypto.createHmac('sha1',this.salt)
                   .update(password)
                   .digest('hex');
		} catch(err){
            return ""
		}
	}
};

module.exports=mongoose.model("User", userSchema);