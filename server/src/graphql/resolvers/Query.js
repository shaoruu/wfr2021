import { PledgeModel, UserModel, TShirtOrderModel } from '../../models';

// (async () => {
//   const { received } = await UserModel.findOne({
//     email: '23enyat@students.tas.tw',
//   });

//   for (const a of received) {
//     const pledge = await PledgeModel.findById(a);
//     // console.log(pledge.pledger);
//     const pledger = await UserModel.findById(pledge.pledger);
//     console.log(pledger);
//     if (pledger.email === '23dylans@students.tas.tw') {
//       console.log(pledge._id, pledge.flatDonation, pledge.perLapDonation);
//     }
//   }
// })();

const Query = {
  me(_, __, { user }) {
    return user;
  },
  user(_, { email }) {
    return UserModel.findOne({ email });
  },
  users() {
    return UserModel.find();
  },
  pledge(_, { id }) {
    return PledgeModel.findById(id);
  },
  pledges() {
    return PledgeModel.find({ eventWide: false });
  },
  async tShirtOrders() {
    const allTShirts = await TShirtOrderModel.find();
    return allTShirts.filter(
      ({ sCount, mCount, lCount }) => sCount + mCount + lCount !== 0,
    );
  },
};

export default Query;
