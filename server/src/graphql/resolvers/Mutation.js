import fs from 'fs';

import bcrypt from 'bcryptjs';

import { PledgeModel, TShirtOrderModel, UserModel } from '../../models';
import Helpers from '../../utils/helpers';

const id2emailSrcRAW = fs.readFileSync('./server/id2email.json');
const id2email = JSON.parse(id2emailSrcRAW);

const adminEmails = [
  '22ethany@students.tas.tw',
  '21cheskac@tas.tw',
  '23adaml@students.tas.tw',
  '24andreay@students.tas.tw',
  '21gracec@students.tas.tw',
  '22evelynh@students.tas.tw',
  '23patrickh@students.tas.tw',
  '21jessicao@students.tas.tw',
  '23benjaminc@students.tas.tw',
  '23emilyh@students.tas.tw',
  '24sophiew@students.tas.tw',
  '22selinal@students.tas.tw',
  '21ianh1@students.tas.tw',
  '23charlenec@students.tas.tw',
  '22daniellel@students.tas.tw',
  '21hironorik@students.tas.tw',
];

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
    if (
      args.schoolId.length === 8 &&
      !id2emailExists(args.schoolId, args.email)
    )
      throw new Error('TAS ID and Email did not match any records.');
    if (existing) throw new Error('Email already in use.');

    const hashedPassword = await Helpers.hashPassword(password);
    const user = new UserModel({
      ...args,
      password: hashedPassword,
      email: args.email.toLowerCase(),
      isAdmin: adminEmails.includes(args.email.toLowerCase()),
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
    { user },
  ) {
    const pledge = await Helpers.makePledge(
      flatDonation,
      perLapDonation,
      user.email,
      receiverEmail,
    );

    return pledge;
  },
  async pledgeMe(
    parent,
    { input: { flatDonation, perLapDonation, pledgerEmail } },
    { user },
  ) {
    const pledge = await Helpers.makePledge(
      flatDonation,
      perLapDonation,
      pledgerEmail,
      user.email,
    );

    return pledge;
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
      isTAS: true,
      createdAt: Date.now(),
    });

    await pledge.save();

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
      isTAS: outsiderEmail.toLowerCase().includes('tas.tw'),
      createdAt: Date.now(),
    });

    await pledge.save();

    const frontendURL =
      process.env.NODE_ENV === 'production'
        ? process.env.FRONTEND_URL_PROD
        : process.env.FRONTEND_URL;
    const cancelLink = `${frontendURL}/cancel/${pledge.id}`;

    // send email to pledger & receiver
    // TODO: make this more protected.
    await Helpers.sendEmail(
      outsiderEmail,
      'Donating to WalkForRefugees',
      `Thank you for donating to ${receiver.firstName} ${receiver.lastName}! Click this link if you want to cancel this pledge: ${cancelLink}`,
      `<p>Dear Pledger,</p><br/>
<p>Thank you for supporting Walk for Refugees 2021 with your pledge. If you believe that this donation was made in error, you can cancel it at any time before April 16th, 15:35 GMT+8 by clicking <a href="${cancelLink}">here</a></p><br/>
<p>To register to walk in our walkathon, please click <a href="${frontendURL}/register">here</a>.</p>
<p>To buy an event T-shirt, please click <a href="${frontendURL}/products">here</a>.</p>
<p>To make an additional pledge, please click <a href="${frontendURL}/pledge">here</a>.</p><br/>

<p>As a reminder, ID card holders have agreed to have their donations automatically deducted from their ID cards, and non-ID card holders have agreed to have their donations paid in cash. Thank you very much for supporting our cause!</p><br/>
<p>Best,</p>
<p>The W4R Team</p>
`,
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
      isTAS: outsiderEmail.toLowerCase().includes('tas.tw'),
      createdAt: Date.now(),
      eventWide: true,
    });

    await pledge.save();

    const frontendURL =
      process.env.NODE_ENV === 'production'
        ? process.env.FRONTEND_URL_PROD
        : process.env.FRONTEND_URL;
    const cancelLink = `${frontendURL}/cancel/${pledge.id}`;

    // send email to pledger & receiver
    // TODO: make this more protected.
    await Helpers.sendEmail(
      outsiderEmail,
      'Donating to WalkForRefugees',
      `Thank you for donating to the event! Click this link if you want to cancel this pledge: ${cancelLink}`,
      `<p>Dear Pledger,</p><br/>
<p>Thank you for supporting Walk for Refugees 2021 with your pledge. If you believe that this donation was made in error, you can cancel it at any time before April 16th, 15:35 GMT+8 by clicking <a href="${cancelLink}">here</a></p><br/>
<p>To register to walk in our walkathon, please click <a href="${frontendURL}/register">here</a>.</p>
<p>To buy an event T-shirt, please click <a href="${frontendURL}/products">here</a>.</p>
<p>To make an additional pledge, please click <a href="${frontendURL}/pledge">here</a>.</p><br/>

<p>As a reminder, ID card holders have agreed to have their donations automatically deducted from their ID cards, and non-ID card holders have agreed to have their donations paid in cash. Thank you very much for supporting our cause!</p><br/>
<p>Best,</p>
<p>The W4R Team</p>
`,
    );

    return true;
  },
  async cancelPledge(parent, { id }) {
    await PledgeModel.findByIdAndRemove(id);
    return true;
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
