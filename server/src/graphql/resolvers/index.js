import Mutation from './Mutation';
import Query from './Query';
import Subscription from './Subscription';
import Types from './Types';

const resolvers = {
  Query,
  Mutation,
  Subscription,
  ...Types,
};

export default resolvers;
