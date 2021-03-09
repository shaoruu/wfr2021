import fs from 'fs';

import bcrypt from 'bcryptjs';

import { PledgeModel, TShirtOrderModel, UserModel } from '../../models';
import Helpers from '../../utils/helpers';

const id2emailSrcRAW = fs.readFileSync('./server/id2email.json');
const id2email = JSON.parse(id2emailSrcRAW);

const id2emailExists = (testId, testEmail) => {
  console.log(testId, testEmail);
  return !!id2email.find(
    ({ id, email }) =>
      id.toLowerCase() === testId && email.toLowerCase() === testEmail,
  );
};

const UserMutations = {
  async register(parent, { input }) {
    const { password, ...args } = input;

    const existing = await UserModel.findOne({ email: args.email });
    if (!id2emailExists(args.schoolId, args.email))
      throw new Error('TAS ID and Email did not match any records.');
    if (existing) throw new Error('Email already in use.');

    const hashedPassword = await Helpers.hashPassword(password);
    const user = new UserModel({
      password: hashedPassword,
      ...args,
    });

    await user.save();
    await Helpers.sendConfirmation(user.email, user.id);

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
  async confirm(parent, { id }) {
    const user = await UserModel.findById(id);

    if (!user) throw new Error('Unable to confirm.');

    user.confirmed = true;
    await user.save();
    console.log(user);

    return true;
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
