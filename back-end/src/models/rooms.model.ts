import mongoose from 'mongoose';

const RoomsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  user_list: {
    type: Array,
    required: true,
    default: []
  },

  type: {
    type: String,
    required: true,
    default: 'Direct message'
  },
  	
  admin: {
    type: String,
    required: true,
    default: ''
  },

  message_list: {
    type: Array,
    required: true,
    default: [{
      
    }]
  }
})