import { allow, rule, shield } from 'graphql-shield';

const isAuthenticated = rule({ cache: 'contextual' })(
  async (parent, args, ctx, info) => {
    return ctx.userId;
  },
);

const permissions = shield({
  Query: {
    '*': allow,
  },
  Mutation: {
    '*': allow,
    pledgeTo: isAuthenticated,
    pledgeMe: isAuthenticated,
    pledgeEvent: isAuthenticated,
    buyTShirt: isAuthenticated,
  },
});

export default permissions;
