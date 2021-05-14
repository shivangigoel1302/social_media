const Post = require('../models/post');

exports.getPosts = (req,res)=>{
	const posts = Post.find().
	select("_id title body")
	.then((posts)=>{
		res.json({
			posts
		});
	})
	.catch(err=>console.log(err));
};

exports.createPost = (req,res) =>{
	const userpost = new Post(req.body);
	
    userpost.save()
    .then(result =>{
       res.json({
       	userpost: result
       });
    });
	
};