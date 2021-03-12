import Mutation from './Mutation';
import Query from './Query';
import Types from './Types';

const resolvers = {
  Query,
  Mutation,
  ...Types,
};

export default resolvers;
