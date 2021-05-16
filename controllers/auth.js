const jwt = require('jsonwebtoken');
require('dotenv').config()
const User = require('../models/user');


exports.signup = async (req,res) =>{
	const userExists = await User.findOne({email : req.body.email});
	if(userExists){
		return res.status(403).json({
			error : "Email is taken!"
		});
	}
	const user = await new User(req.body);
	await user.save();
	res.status(200).json({
		message: "Signup successful! Please Login"
	}); 
};

exports.signin = (req,res) => {
     //find the user based on email
     const {email,password} = req.body
     User.findOne({email},(err,user) =>{
     	//if err or no user
     	if(err || !user){
           return res.status(401).json({
           	error:"user not registered"
           })
     	}
     	// if user , make sure email and password match
        //create authenticate method in model and use here
        if(!user.authenticate(password)){
        	return res.status(401).json({
            	error:"email and password do not match"
           })
        }

        //generate a token with user id and secret 
        const token = jwt.sign({_id: user._id},process.env.JWT_SECRET);
	    //persist token as 't' in cookie with expirey date
        res.cookie("t",token, {expire: new Date() + 9999});
	    //return response with the user and token to frontend client
        const {_id,name,email} = user;
        return res.json({
        	token,
        	user :{
        		_id,email,name
        	}
        })
     });
	
	

};

exports.signout = (req,res) => {
	res.clearCookie("t")
	return res.status(200).json({
		message:"signout successful"
	});
}