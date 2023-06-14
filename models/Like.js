const mongoose = require('mongoose');
const { Schema } = mongoose;

const likeSchema = new Schema({
  postId: {
    type: String,
    required: true
  },
  email: {
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

});


module.exports = mongoose.model('like', likeSchema);