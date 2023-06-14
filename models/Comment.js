const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new Schema({
  postId: {
    type: String,
    required: true
  },
  user: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  comment: {
    type: String,
    required: true
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


module.exports = mongoose.model('comment', commentSchema);