const express  = require('express')
const post = require('../models/Post');
const router = express.Router()
const fetchuser = require('../middleware/fetchuser');
const user = require('../models/User');

//Creating a user using POST /api/auth/signup request.
router.post('/addPost', fetchuser ,async (req, res)=>{
    try {
        let newpost = await post.create({
            user: req.User.id,
            content: req.body.content,
            name: req.body.name,
            songname: req.body.songname,
            userImage: req.body.userImage,
            image: req.body.image,
            audio: req.body.audio,
            month: req.body.month,
            date: req.body.date,
            year:req.body.year
        });
        res.json({newpost})
    } catch (error) {
        res.status(500).send("Internal Server Error Occurred. Please Try Again.")
        console.log(error);
    }
})

router.get('/fetchProfilePosts', fetchuser , async (req, res)=>{
    try {
        const allPosts = await post.find({user: req.User.id});
        res.json(allPosts)
    } catch (error) {
        res.status(500).send("Internal Server Error Occurred. Please Try Again.")
        console.log(error);
    }
})

router.get('/fetchHomePosts', fetchuser , async (req, res)=>{
    try {
        const allPosts = await post.find({"user":{$ne : req.User.id}});
        res.json(allPosts)
    } catch (error) {
        res.status(500).send("Internal Server Error Occurred. Please Try Again.")
        console.log(error);
    }
})

router.get('/fetchSpecificPosts/:id', async (req, res)=>{
    try {
        const allPosts = await post.find({"user":req.params.id });
        res.json(allPosts)
    } catch (error) {
        res.status(500).send("Internal Server Error Occurred. Please Try Again.")
        console.log(error);
    }
})



router.delete('/deletepost/:id', fetchuser, async (req, res)=>{
    try {
        
        const delpost = await post.findByIdAndDelete(req.params.id)
        res.json({delpost:delpost});
    } catch (error) {
        res.status(500).send("Internal Server Error Occurred. Please Try Again.")
        console.log(error);
    }
})

router.put('/updatePost/:id', async (req, res)=>{
    try {
        
        const postt = await post.findById(req.params.id);
        
        const newPost = {
            genre:req.body.genre,
            lyrics:req.body.lyrics
        }

        const updatePost = await post.findByIdAndUpdate(req.params.id, {$set: newPost}, {new:true})

        res.json({updatePost:updatePost});
    } catch (error) {
        res.status(500).send("Internal Server Error Occurred. Please Try Again.")
        console.log(error);
    }
})

router.put('/updatePostViews/:id', async (req, res)=>{
    try {
        
        const postt = await post.findById(req.params.id);
        let views = postt.views;
        views = views + 1;
        const newPost = {
            views:views
        }

        const updatePost = await post.findByIdAndUpdate(req.params.id, {$set: newPost}, {new:true})

        res.json({updatePost:updatePost});
    } catch (error) {
        res.status(500).send("Internal Server Error Occurred. Please Try Again.")
        console.log(error);
    }
})

router.get('/fetchTopPosts' , async (req, res)=>{
    try {
        const allPosts = await post.find({});
        res.json(allPosts)
    } catch (error) {
        res.status(500).send("Internal Server Error Occurred. Please Try Again.")
        console.log(error);
    }
})


router.get('/fetchCreators/:name' , async (req, res)=>{
    try {
        const allCreators = await user.find({'name': req.params.name});
        res.json(allCreators)
    } catch (error) {
        res.status(500).send("Internal Server Error Occurred. Please Try Again.")
        console.log(error);
    }
})

router.get('/fetchGenrePost/:genre' , async (req, res)=>{
    try {
        const allCreators = await post.find({'genre': req.params.genre});
        res.json(allCreators)
    } catch (error) {
        res.status(500).send("Internal Server Error Occurred. Please Try Again.")
        console.log(error);
    }
})

module.exports = router