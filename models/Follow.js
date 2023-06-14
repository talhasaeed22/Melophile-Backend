const mongoose = require('mongoose');
const { Schema } = mongoose;

  const followSchema = new Schema({
    owner:{
        type:String,
        required:true
    },
    follow:{
        type:String,
        required:true
    },
    
  });


  module.exports = mongoose.model('follow', followSchema);