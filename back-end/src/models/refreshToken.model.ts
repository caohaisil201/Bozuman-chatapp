import mongoose from 'mongoose';

const RefreshTokenSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
  token: String,
  created: { type: Date, default: Date.now },
});

export const RefreshToken = mongoose.model('RefreshToken', RefreshTokenSchema);
