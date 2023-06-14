const express = require('express');
const bcrypt = require('bcrypt');
const user = require('../models/User');
const favourite = require('../models/Favourite')
const router = express.Router();
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = "thisiswebtokensecret";

var jwt = require('jsonwebtoken');

//Adding a new Chat
router.post('/addFavourite', fetchuser ,async (req, res)=>{
    try {
        let success = false;

        let exist = await favourite.findOne({ songname: req.body.songname });

        if(exist){
            return res.status(400).json({success,  error: "Sorry there is already present" })
        }
        
        let newFavourite = await favourite.create({
            
            owner:req.User.id,
            songname:req.body.songname,
            song:req.body.song,
            lyrics:req.body.lyrics

        });
        success = true
        res.json({newFavourite:newFavourite, success})
    } catch (error) {
        res.status(500).send("Internal Server Error Occurred. Please Try Again.")
        console.log(error);
    }
})

router.get('/fetchFavourite', fetchuser , async (req, res)=>{
    try {
        const allFavourite = await favourite.find({
            
            owner: req.User.id
        });
        res.json(allFavourite)
    } catch (error) {
        res.status(500).send("Internal Server Error Occurred. Please Try Again.")
        console.log(error);
    }
})

router.delete('/deleteFavourite/:id', fetchuser, async (req, res)=>{
    try {
        
        const delpost = await favourite.findByIdAndDelete(req.params.id)
        res.json({delpost:delpost});
    } catch (error) {
        res.status(500).send("Internal Server Error Occurred. Please Try Again.")
        console.log(error);
    }
})




module.exports = router