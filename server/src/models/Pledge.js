import { model, Schema } from 'mongoose';

const pledgeSchema = new Schema(
  {
    flatDonation: {
      type: Number,
      default: 0,
    },
    perLapDonation: {
      type: Number,
      default: 0,
    },
    collected: {
      type: Boolean,
      default: false,
    },
    isTAS: {
      type: Boolean,
      default: false,
    },
    outsiderEmail: {
      type: String,
      default: '',
    },
    outsiderName: {
      type: String,
      default: '',
    },
    eventWide: {
      type: Boolean,
      default: false,
    },
    pledger: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    receiver: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    createdAt: {
      type: String,
    },
  },
  {
    timestamp: true,
  },
);

export default model('Pledge', pledgeSchema);
