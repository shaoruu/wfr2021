import { model, Schema } from 'mongoose';

const userSchema = new Schema({
  pickedUp: {
    type: Boolean,
    default: false,
  },
  sCount: {
    type: Number,
    default: 0,
  },
  mCount: {
    type: Number,
    default: 0,
  },
  lCount: {
    type: Number,
    default: 0,
  },
  buyer: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

export default model('User', userSchema);
