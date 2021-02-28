import bcrypt from 'bcryptjs';

import { PledgeModel, TShirtOrderModel, UserModel } from '../../models';
import Helpers from '../../utils/helpers';

const UserMutations = {
  async register(parent, { input }) {
    const { password, ...args } = input;

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
  pledgeTo(
    parent,
    { input: { flatDonation, perLapDonation, receiverEmail } },
    { user },
  ) {
    return Helpers.makePledge(
      flatDonation,
      perLapDonation,
      user.email,
      receiverEmail,
    );
  },
  pledgeMe(
    parent,
    { input: { flatDonation, perLapDonation, pledgerEmail } },
    { user },
  ) {
    return Helpers.makePledge(
      flatDonation,
      perLapDonation,
      pledgerEmail,
      user.email,
    );
  },
  async pledgeEvent(
    parent,
    { input: { flatDonation, perLapDonation } },
    { user: pledger },
  ) {
    const pledge = new PledgeModel({
      flatDonation,
      perLapDonation,
      eventWide: true,
      pledger,
    });

    await pledge.save();

    return pledge;
  },
  async buyTShirt(parent, { input }, { user: buyer }) {
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

    return tShirtOrder;
  },
};

export default UserMutations;
