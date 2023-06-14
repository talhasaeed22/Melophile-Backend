const express = require('express');
const bcrypt = require('bcrypt');
const user = require('../models/User');
const playlist = require('../models/Playlist')
const router = express.Router();
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = "thisiswebtokensecret";

var jwt = require('jsonwebtoken');

//Adding a new follower
router.post('/addSong', fetchuser ,async (req, res)=>{
    try {
        let success = false;
        let alreadyPresent = await playlist.findOne({songname:req.body.songname});
        if(alreadyPresent) {
            return res.status(400).json({success,  error: "Sorry there is already present" })
        }
        let newsong = await playlist.create({
            owner: req.User.id,
            song:req.body.song,
            songname:req.body.songname,
            privacy:req.body.privacy
        });
        success = true
        res.json({success, newsong})
    } catch (error) {
        res.status(500).send("Internal Server Error Occurred. Please Try Again.")
        console.log(error);
    }
})

router.get('/fetchSong', fetchuser , async (req, res)=>{
    try {
        
        const allSongs = await playlist.find({owner: req.User.id});
        res.json(allSongs)
    } catch (error) {
        res.status(500).send("Internal Server Error Occurred. Please Try Again.")
        console.log(error);
    }
})




module.exports = router