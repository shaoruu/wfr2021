import fs from 'fs';

import bcrypt from 'bcryptjs';

import { PledgeModel, TShirtOrderModel, UserModel } from '../../models';
import Helpers from '../../utils/helpers';

const id2emailSrcRAW = fs.readFileSync('./server/id2email.json');
const id2email = JSON.parse(id2emailSrcRAW);

const id2emailExists = (testId, testEmail) => {
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

    // making an empty tshirt order
    const tShirtOrder = new TShirtOrderModel({ buyer: user });
    await tShirtOrder.save();

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

    return true;
  },
  async pledgeTo(
    parent,
    { input: { flatDonation, perLapDonation, receiverEmail } },
    { user, pubsub },
  ) {
    const pledge = await Helpers.makePledge(
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
    const pledge = await Helpers.makePledge(
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
      createdAt: Date.now(),
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
  async removePledge(parent, { id }) {
    await PledgeModel.findByIdAndRemove(id);

    return true;
  },
  async outsiderPledge(
    parent,
    {
      input: {
        flatDonation,
        perLapDonation,
        outsiderEmail,
        outsiderName,
        receiverEmail,
      },
    },
  ) {
    const receiver = await UserModel.findOne({
      email: receiverEmail,
    });

    if (!receiver) return false; // don't let them know it DNE

    const pledge = new PledgeModel({
      flatDonation,
      perLapDonation,
      outsiderEmail,
      outsiderName,
      receiver,
      createdAt: Date.now(),
    });

    await pledge.save();

    // send email to pledger & receiver
    // TODO: make this more protected.
    await Helpers.sendEmail(
      outsiderEmail,
      'Donating to WalkForRefugees',
      `Thank you for donating to ${receiver.firstName} ${
        receiver.lastName
      }! Click this link if you want to cancel this pledge: ${
        process.env.FRONTEND_URL || 'http://localhost:3000'
      }/cancel/${pledge.id}`,
    );

    return true;
  },
  async outsiderPledgeEvent(
    parent,
    { input: { flatDonation, perLapDonation, outsiderEmail, outsiderName } },
  ) {
    const pledge = new PledgeModel({
      flatDonation,
      perLapDonation,
      outsiderEmail,
      outsiderName,
      createdAt: Date.now(),
      eventWide: true,
    });

    await pledge.save();

    // send email to pledger & receiver
    // TODO: make this more protected.
    await Helpers.sendEmail(
      outsiderEmail,
      'Donating to WalkForRefugees',
      `Thank you for donating to our event!! Click this link if you want to cancel this pledge: ${
        process.env.FRONTEND_URL || 'http://localhost:3000'
      }/cancel/${pledge.id}`,
    );

    return true;
  },
  async cancelPledge(parent, { id }) {
    await PledgeModel.findByIdAndRemove(id);
    return true;
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
};

export default UserMutations;
