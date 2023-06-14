const express = require('express');
const bcrypt = require('bcrypt');
const user = require('../models/User');
const comment = require('../models/Comment')
const router = express.Router();
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = "thisiswebtokensecret";

var jwt = require('jsonwebtoken');

//Adding a new Comment
router.post('/addComment', fetchuser ,async (req, res)=>{
    try {
        
        let newComment = await comment.create({
            postId:req.body.postId,
            user: req.User.id,
            name:req.body.name,
            image:req.body.image,
            comment:req.body.comment,
            month: req.body.month,
            date: req.body.date,
            year:req.body.year

        });
        res.json({newComment})
    } catch (error) {
        res.status(500).send("Internal Server Error Occurred. Please Try Again.")
        console.log(error);
    }
})

router.get('/fetchComment/:id', fetchuser , async (req, res)=>{
    try {
        const allComments = await comment.find({
            
            postId: req.params.id
        });
        res.json(allComments)
    } catch (error) {
        res.status(500).send("Internal Server Error Occurred. Please Try Again.")
        console.log(error);
    }
})




module.exports = router