import { UserModel } from '../../models';

const Subscription = {
  user: {
    async subscribe(_, { id }, { pubsub }) {
      const user = await UserModel.findById(id);

      if (!user) {
        throw new Error('User not found.');
      }

      return pubsub.asyncIterator(`user ${id}`);
    },
  },
};

export default Subscription;
