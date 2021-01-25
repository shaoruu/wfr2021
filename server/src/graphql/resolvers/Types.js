import { PledgeModel, TShirtOrderModel, UserModel } from '../../models';

const getPledges = async (userId) => {
  return PledgeModel.find({
    pledger: await UserModel.findById(userId),
  });
};

const getReceived = async (userId) => {
  return PledgeModel.find({
    receiver: await UserModel.findById(userId),
  });
};

const getEventWide = async (userId) => {
  return PledgeModel.find({
    pledger: await UserModel.findById(userId),
    eventWide: true,
  });
};

const getTShirtOrder = async (userId) => {
  return TShirtOrderModel.find({
    buyer: await UserModel.findById(userId),
  });
};

const getPledger = async (pledgerId) => {
  return UserModel.findById(pledgerId);
};

const Types = {
  AuthPayload: {
    user(parent) {
      const { user } = parent || {};
      return user ? UserModel.findById(user.id) : null;
    },
  },
  User: {
    pledges(parent) {
      return getPledges(parent.id);
    },
    received(parent) {
      return getReceived(parent.id);
    },
    eventWide(parent) {
      return getEventWide(parent.idA);
    },
    tShirtOrder(parent) {
      return getTShirtOrder(parent.id);
    },
  },
  Pledge: {
    pledger(parent) {
      const { pledger } = parent || {};
      return getPledger(pledger.id);
    },
  },
};

export default Types;
