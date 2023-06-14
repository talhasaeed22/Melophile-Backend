const express = require('express');
const bcrypt = require('bcrypt');
const user = require('../models/User');
const chat = require('../models/Chat')
const router = express.Router();
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = "thisiswebtokensecret";

var jwt = require('jsonwebtoken');

//Adding a new Chat
router.post('/addChat' ,async (req, res)=>{
    try {
        let success = false;

        let exist = await user.findOne({ name: req.body.reciever });

        if(!exist){
            return res.status(400).json({success,  error: "Sorry there is no user with this email" })
        }
        
        let newChat = await chat.create({
            
            reciever:req.body.reciever,
            message:req.body.message,
            name:req.body.name,
            date:req.body.date,
            month:req.body.month,
            year:req.body.year

        });
        success = true
        res.json({newChat:newChat, success})
    } catch (error) {
        res.status(500).send("Internal Server Error Occurred. Please Try Again.")
        console.log(error);
    }
})

router.get('/fetchChat/:id', fetchuser , async (req, res)=>{
    try {
        const allChat = await chat.find({
            
            reciever: req.params.id
        });
        res.json(allChat)
    } catch (error) {
        res.status(500).send("Internal Server Error Occurred. Please Try Again.")
        console.log(error);
    }
})




module.exports = router