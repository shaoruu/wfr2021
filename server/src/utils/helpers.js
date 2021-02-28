import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { PledgeModel, UserModel } from '../models';

const APP_SECRET = process.env.APP_SECRET || 'appsecret123';

class Helpers {
  static hashPassword = (password) => {
    if (password.length < 8) {
      throw new Error('Password must be 8 characters or longer.');
    }

    return bcrypt.hash(password, 10);
  };

  static getUserId = (request) => {
    const header = request.request
      ? request.request.headers.authorization
      : request.connection.context.Authorization;

    if (header) {
      const token = header.replace('Bearer ', '');
      let verifiedToken;

      try {
        verifiedToken = jwt.verify(token, APP_SECRET);
      } catch (e) {
        console.log('invalid signature');
        return null;
      }

      return verifiedToken && verifiedToken.userId;
    }

    return null;
  };

  static generateToken = (userId) => {
    return jwt.sign({ userId }, APP_SECRET, { expiresIn: '7 days' });
  };

  static makePledge = async (
    flatDonation,
    perLapDonation,
    pledgerEmail,
    receiverEmail,
  ) => {
    const pledger = await UserModel.findOne({ email: pledgerEmail });
    const receiver = await UserModel.findOne({ email: receiverEmail });

    const pledge = new PledgeModel({
      flatDonation,
      perLapDonation,
      pledger,
      receiver,
    });

    await pledge.save();

    pledger.pledges.push(pledge.id);
    await pledger.save();

    receiver.received.push(pledge.id);
    await receiver.save();

    return pledge;
  };
}

export default Helpers;
