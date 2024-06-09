import { model, Schema } from 'mongoose';

const logSchema = new Schema({
  level: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'low',
  },
  message: {
    type: String,
    required: true,
  },
  origin: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const LogModel = model('Log', logSchema, 'logs');
