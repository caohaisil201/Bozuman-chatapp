import mongoose from 'mongoose';
import Joi from 'joi';
const RoomsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    default: 'Empty Bucket'
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
    default: 'Empty Bucket'
  },

  message_list: {
    type: Array<{
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
      },
      time: {
        type: Date,
        required: true,
        default: Date.now
      }
    }>,
    required: true,
    default: []
  },

  room_id: {
    type: String,
    required: true
  },
  count: {
    type: Number,
    required: true,
    default: 0
  }
})

export const roomsSchema = Joi.object({
  name: Joi.string()
  .trim()
    .min(4)
    .max(32)
    .pattern(new RegExp('^[a-zA-Z0-9_ ]*$'))
    .required(),
  user_list: Joi
    .array()
    .items(Joi.string().min(8)
    .max(32)
    .pattern(new RegExp('^[a-zA-Z0-9_-]+$'))
    .required())
    .required(),
    room_id: Joi
    .number()
});

export const Rooms = mongoose.model('room', RoomsSchema);