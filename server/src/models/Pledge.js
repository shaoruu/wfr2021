import { model, Schema } from 'mongoose';

const pledgeSchema = new Schema({
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
});

export default model('Pledge', pledgeSchema);
