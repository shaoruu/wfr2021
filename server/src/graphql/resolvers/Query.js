import { PledgeModel, UserModel } from '../../models';

const Query = {
  me(_, __, { userId }) {
    return UserModel.findById(userId);
  },
  pledge(_, { id }) {
    return PledgeModel.findById(id);
  },
  pledges() {
    return PledgeModel.find();
  },
};

export default Query;
