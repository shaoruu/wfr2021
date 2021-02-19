import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { PledgeModel, UserModel } from '../models';

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
      const verifiedToken = jwt.verify(
        token,
        process.env.APP_SECRET || 'appsecret123',
      );

      return verifiedToken && verifiedToken.userId;
    }

    return null;
  };

  static generateToken = (userId) => {
    return jwt.sign({ userId }, 'thisisasecret', { expiresIn: '7 days' });
  };

  static makePledge = async (
    flatDonation,
    perLapDonation,
    pledgerId,
    receiverId,
  ) => {
    const pledger = await UserModel.findById(pledgerId);
    const receiver = await UserModel.findById(receiverId);

    const pledge = new PledgeModel({
      flatDonation,
      perLapDonation,
      pledger,
      receiver,
    });

    await pledge.save();

    return pledge;
  };
}

export default Helpers;
