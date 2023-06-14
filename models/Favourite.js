const mongoose = require('mongoose');
const { Schema } = mongoose;

const favouriteSchema = new Schema({
  owner: {
    type: String,
    required: true
  },
  songname: {
    type: String,
    required: true
  },
  lyrics: {
    type: [Object],
    required: true
  },
  song: {
    type: String,
  },


});


module.exports = mongoose.model('favourite', favouriteSchema);