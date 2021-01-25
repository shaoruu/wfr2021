import { PledgeModel } from '../../models';

const Query = {
  me(_, __, { user }) {
    return user;
  },
  pledge(_, { id }) {
    return PledgeModel.findById(id);
  },
  pledges() {
    return PledgeModel.find();
  },
};

export default Query;
