import { PledgeModel, TShirtOrderModel, UserModel } from '../../models';

const getPledges = async (userId) => {
  return PledgeModel.find({
    pledger: await UserModel.findById(userId),
  });
};

const getReceived = async (userId) => {
  return PledgeModel.find({
    received: await UserModel.findById(userId),
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

const getUser = async (userId) => {
  return UserModel.findById(userId);
};

const Types = {
  AuthPayload: {
    user(parent) {
      const { user } = parent || {};
      return user ? UserModel.findById(user.id) : null;
    },
  },
  User: {
    fullName(parent) {
      return parent.firstName + ' ' + parent.lastName;
    },
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
      return getUser(pledger);
    },
    receiver(parent) {
      const { receiver } = parent || {};
      return getUser(receiver);
    },
  },
};

export default Types;
