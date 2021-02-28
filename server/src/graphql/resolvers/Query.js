import { PledgeModel, UserModel } from '../../models';

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
