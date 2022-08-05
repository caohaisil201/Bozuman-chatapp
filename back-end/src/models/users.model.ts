import mongoose from 'mongoose';
import Joi from 'joi';

const UsersSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  full_name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  active: {
    type: Boolean,
    required: false,
    default: false,
  },

  birth_day: {
    type: Date,
    required: false,
  },

  gender: {
    type: Boolean,
    required: false,
  },

  phone: {
    type: String,
    required: false,
  },

  avatar: {
    type: String,
    required: false,
  },

  description: {
    type: String,
    required: false,
  },
  
  room_list: {
    type: Array<{
      room_id: {
        type: Number,
        required: true,
      },

      last_message: {
        type: String,
        required: true,
      },

      last_time: {
        type: Date,
        required: true,
      },

      unread: {
        type: Boolean,
        required: true,
        default: false,
      }
    }>,
    required: false,
    default: [],
  },
});

export const registerSchema = Joi.object({
  username: Joi.string()
    .min(8)
    .max(16)
    .pattern(new RegExp('^[a-zA-Z0-9_-]+$'))
    .required(),
  password: Joi.string()
    .max(50)
    .required(),
  full_name: Joi.string()
    .min(8)
    .max(50)
    .pattern(new RegExp('^[a-zA-Z0-9_ ]*$'))
    .required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: false },
  }),
});

export const signInSchema = Joi.object({
  username: Joi.string()
    .min(8)
    .max(16)
    .pattern(new RegExp('^[a-zA-Z0-9_-]+$'))
    .required(),
  password: Joi.string()
    .max(50)
    .required(),
});

export const Users = mongoose.model('user', UsersSchema);

