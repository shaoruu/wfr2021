import bcrypt from 'bcryptjs';
import { PledgeModel, TShirtOrderModel, UserModel } from '../../models';
import Helpers from '../../utils/helpers';

const UserMutations = {
  async signup(parent, { input }) {
    const { password, ...args } = input;

    const hashedPassword = Helpers.hashPassword(password);
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
    { input: { flatDonation, perLapDonation, pledgerId } },
    { userId },
  ) {
    return Helpers.makePledge(flatDonation, perLapDonation, pledgerId, userId);
  },
  pledgeMe(
    parent,
    { input: { flatDonation, perLapDonation, receiverId } },
    { userId },
  ) {
    return Helpers.makePledge(flatDonation, perLapDonation, userId, receiverId);
  },
  async pledgeEvent(
    parent,
    { input: { flatDonation, perLapDonation } },
    { userId },
  ) {
    const pledger = await UserModel.findById(userId);

    const pledge = new PledgeModel({
      flatDonation,
      perLapDonation,
      eventWide: true,
      pledger,
    });

    await pledge.save();

    return pledge;
  },
  async buyTShirt(parent, { input }, { userId }) {
    const buyer = await UserModel.findById(userId);
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
