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
    eventWide: true,
  });
};

const getTShirtOrder = async (userId) => {
  return (
    TShirtOrderModel.findOne({
      buyer: await UserModel.findById(userId),
    }) || { sCount: 0, mCount: 0, lCount: 0 }
  );
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
  TShirtOrder: {
    buyer(parent) {
      const { buyer } = parent;
      return getUser(buyer);
    },
  },
};

export default Types;
