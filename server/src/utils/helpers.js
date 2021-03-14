import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

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
      isTAS: true,
      createdAt: Date.now(),
    });

    await pledge.save();

    pledger.pledges.push(pledge.id);
    await pledger.save();

    receiver.received.push(pledge.id);
    await receiver.save();

    return pledge;
  };

  static sendEmail = async (to, subject, text, html) => {
    let transporter;

    if (process.env.NODE_ENV === 'production') {
      transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_ACCOUNT,
          pass: process.env.EMAIL_PASSWORD, // naturally, replace both with your real credentials or an application-specific password
        },
      });
    } else {
      const testAccount = await nodemailer.createTestAccount();

      transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: testAccount.user, // generated ethereal user
          pass: testAccount.pass, // generated ethereal password
        },
      });
    }

    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: '"Walk For Refugees" <walk4refugees@students.tas.tw>', // sender address
      to, // list of receivers
      subject, // Subject line
      text, // plain text body
      html, // html body
    });

    console.log('Message sent: %s', info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  };

  static sendConfirmation = async (email, userId) => {
    const confirmLink = `${
      process.env.NODE_ENV === 'production'
        ? process.env.FRONTEND_URL_PROD
        : process.env.FRONTEND_URL
    }/confirm/${userId}`;

    // TODO: make this more protected.
    await Helpers.sendEmail(
      email,
      'Email Confirmation for W4R',
      `Click this link to confirm registration: ${confirmLink}`,
      `<p>Dear Participant</p><br/>
<p>Thank you for joining Walk for Refugees 2021. To enable full functionality of your account, please verify it by clicking <a href="${confirmLink}">here</a>.</p><br/>
<p>Within your dashboard, you will find options to pledge to others, track your incoming pledges, and view your outgoing pledges. In addition, you will have access to the ordering form for this year’s event T-shirt.</p><br/>
<p>As a reminder, you have agreed to have all transactions automatically deducted from your ID card. Thank you very much for supporting our cause!</p><br/>
<p>Best,</p>
<p>The W4R Team</p>
`,
    );
  };
}

export default Helpers;
