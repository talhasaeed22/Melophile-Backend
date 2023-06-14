const mongoose = require('mongoose');
const { Schema } = mongoose;

const chatSchema = new Schema({

  reciever: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  name: {
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


module.exports = mongoose.model('chat', chatSchema);