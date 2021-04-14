import { PledgeModel, UserModel } from '../../models';

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
  users() {
    return UserModel.find();
  },
  pledge(_, { id }) {
    return PledgeModel.findById(id);
  },
  pledges() {
    return PledgeModel.find();
  },
};

export default Query;
