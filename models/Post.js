const mongoose = require('mongoose');
const { Schema } = mongoose;

  const postSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
      },
      content:{
          type:String,
          required:true
      },
      name: {
        type:String,
        required:true
      },
      songname: {
        type:String,
        required:true
      },
      lyrics: {
        type: [Object],
      },
      genre: {
        type:String,
      },
      views: {
        type:Number,
        default:0
      },
      userImage: {
        type:String,
        required:true
      },
      image:{
          type:String,
      },
      audio:{
          type:String,
      },
      date:{
        type:String,
      },
      month:{
        type:String,
      },
      year:{
        type:String,
      }
  });


  module.exports = mongoose.model('post', postSchema);