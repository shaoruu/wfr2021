import bcrypt from 'bcryptjs';

import { PledgeModel, TShirtOrderModel, UserModel } from '../../models';
import Helpers from '../../utils/helpers';

const UserMutations = {
  async register(parent, { input }) {
    const { password, ...args } = input;

    const existing = await UserModel.findOne({ email: args.email });
    if (existing) throw new Error('Email already in use.');

    const hashedPassword = await Helpers.hashPassword(password);
    const user = new UserModel({
      password: hashedPassword,
      ...args,
    });

    await user.save();

    return {
      user,
      token: Helpers.generateToken(user.id),
    };
  },
  async login(parent, { input }) {
    const { email, password } = input;

    const user = await UserModel.findOne({
      email,
    });

    if (!user) {
      throw new Error('Unable to login');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new Error('Unable to login');
    }

    return {
      user,
      token: Helpers.generateToken(user.id),
    };
  },
  async pledgeTo(
    parent,
    { input: { flatDonation, perLapDonation, receiverEmail } },
    { user, pubsub },
  ) {
    const pledge = Helpers.makePledge(
      flatDonation,
      perLapDonation,
      user.email,
      receiverEmail,
    );

    pubsub.publish(`user ${user.id}`, {
      user: {
        mutation: 'UPDATED',
        data: await UserModel.findById(user.id),
      },
    });

    return pledge;
  },
  async pledgeMe(
    parent,
    { input: { flatDonation, perLapDonation, pledgerEmail } },
    { user, pubsub },
  ) {
    const pledge = Helpers.makePledge(
      flatDonation,
      perLapDonation,
      pledgerEmail,
      user.email,
    );

    pubsub.publish(`user ${user.id}`, {
      user: {
        mutation: 'UPDATED',
        data: await UserModel.findById(user.id),
      },
    });

    return pledge;
  },
  async pledgeEvent(
    parent,
    { input: { flatDonation, perLapDonation } },
    { user: pledger, pubsub },
  ) {
    const pledge = new PledgeModel({
      flatDonation,
      perLapDonation,
      eventWide: true,
      pledger,
    });

    await pledge.save();

    pubsub.publish(`user ${pledger.id}`, {
      user: {
        mutation: 'UPDATED',
        data: await UserModel.findById(pledger.id),
      },
    });

    return pledge;
  },
  async buyTShirt(parent, { input }, { user: buyer, pubsub }) {
    let tShirtOrder = await TShirtOrderModel.findOne({
      buyer,
    });

    if (!tShirtOrder) {
      tShirtOrder = new TShirtOrderModel({
        buyer,
      });
    }

    tShirtOrder.sCount = input.sCount;
    tShirtOrder.mCount = input.mCount;
    tShirtOrder.lCount = input.lCount;

    await tShirtOrder.save();

    pubsub.publish(`user ${buyer.id}`, {
      user: {
        mutation: 'UPDATED',
        data: await UserModel.findById(buyer.id),
      },
    });

    return tShirtOrder;
  },
  async removePledge(parent, { id }) {
    await PledgeModel.findByIdAndRemove(id);

    return true;
  },
};

export default UserMutations;
