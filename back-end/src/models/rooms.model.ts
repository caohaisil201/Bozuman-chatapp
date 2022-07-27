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
    type: Array<{
      messageId: {
        type: Number,
        required: false
      },
      count: {
        type: Number,
        required: true
      },
      room_id: {
        type: String,
        required: true
      },
      type: {
        type: String,
        required: false
      },
      sender: {
        type: String,
        required: true
      },
      content: {
        type: String,
        required: true,
        default: ''
      }
    }>,
    required: true,
    default: []
  },

  room_id: {
    type: Number,
    required: true
  },
  count: {

  }
})

export const Rooms = mongoose.model('room', RoomsSchema);