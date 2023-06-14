const express = require('express');
const bcrypt = require('bcrypt');
const user = require('../models/User');
const follow = require('../models/Follow')
const router = express.Router();
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = "thisiswebtokensecret";

var jwt = require('jsonwebtoken');

//Adding a new follower
router.post('/addFollow', fetchuser ,async (req, res)=>{
    try {
        
        let newfollow = await follow.create({
            owner: req.body.owner,
            follow:req.body.follow
        });
        res.json({newfollow})
    } catch (error) {
        res.status(500).send("Internal Server Error Occurred. Please Try Again.")
        console.log(error);
    }
})

router.get('/fetchFollow', fetchuser , async (req, res)=>{
    try {
        const allFollow = await follow.find({user: req.User.id});
        res.json(allFollow)
    } catch (error) {
        res.status(500).send("Internal Server Error Occurred. Please Try Again.")
        console.log(error);
    }
})

router.delete('/deletefollow/:id', fetchuser, async (req, res)=>{
    try {
        
        const delfollow = await follow.findByIdAndDelete(req.params.id)
        res.json({delfollow:delfollow});
    } catch (error) {
        res.status(500).send("Internal Server Error Occurred. Please Try Again.")
        console.log(error);
    }
})




module.exports = router