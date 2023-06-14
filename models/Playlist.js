const mongoose = require('mongoose');
const { Schema } = mongoose;

const playlistSchema = new Schema({
  owner: {
    type: String,
    // required: true
  },
  song: {
    type: String,
    // required: true
  },
  songname:{
    type:String,
  },
  privacy: {
    type: String,
    // required: true
  },
 


});


module.exports = mongoose.model('playlist', playlistSchema);