const express = require("express");

const {
	getPosts,createPost,postsByUser,postById,
	isPoster,
	deletePost,
	updatePost
} = require('../controllers/posts');
const {requireSignin} = require('../controllers/auth');
const {createPostValidator} = require('../validator');
const {userById} = require('../controllers/user');

const router = express.Router();

router.get("/posts", getPosts);

router.post("/post/new/:userId",requireSignin, createPost,createPostValidator);
router.get("/posts/by/:userId",requireSignin, postsByUser);
router.put('/post/:postId',requireSignin,isPoster, updatePost);
router.delete('/post/:postId',requireSignin,isPoster, deletePost);

router.param("userId", userById);
router.param("postId", postById);
module.exports = router;
