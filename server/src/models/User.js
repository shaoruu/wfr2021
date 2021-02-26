import { model, Schema } from 'mongoose';

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  confirmed: {
    type: Boolean,
    default: false,
  },
  schoolId: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  goalLaps: {
    type: Number,
    default: 0,
  },
  lapsRan: {
    type: Number,
    default: 0,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  pledges: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Pledge',
    },
  ],
  received: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Pledge',
    },
  ],
  eventWide: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Pledge',
    },
  ],
  tShirts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'TShirt',
    },
  ],
});

export default model('User', userSchema);
