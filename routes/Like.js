const express = require('express');
const bcrypt = require('bcrypt');
const user = require('../models/User');
const like = require('../models/Like')
const router = express.Router();
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = "thisiswebtokensecret";

var jwt = require('jsonwebtoken');

//Adding a new Comment
router.post('/addLike', fetchuser ,async (req, res)=>{
    try {
        
        let newLike = await like.create({
            postId:req.body.postId,
            email: req.body.email,
            name:req.body.name,
            image:req.body.image,

        });
        res.json({newLike})
    } catch (error) {
        res.status(500).send("Internal Server Error Occurred. Please Try Again.")
        console.log(error);
    }
})

router.get('/fetchlikes/:id', fetchuser , async (req, res)=>{
    try {
        const allLikes = await like.find({
            postId: req.params.id
        });
        res.json(allLikes)
    } catch (error) {
        res.status(500).send("Internal Server Error Occurred. Please Try Again.")
        console.log(error);
    }
})




module.exports = router