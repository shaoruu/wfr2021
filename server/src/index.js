import path from 'path';

import { GraphQLServer, PubSub } from 'graphql-yoga';

import resolvers from './graphql/resolvers';
import { UserModel } from './models';
import mongo from './mongo';
import Helpers from './utils/helpers';

require('dotenv-defaults').config();

mongo.connect();

const pubsub = new PubSub();

const server = new GraphQLServer({
  typeDefs: path.join(__dirname, 'graphql', 'schema.graphql'),
  resolvers,
  async context(request) {
    return {
      user: await UserModel.findById(Helpers.getUserId(request)),
      pubsub,
    };
  },
});

server.start({ port: process.env.PORT | 4000 }, () => {
  console.log(
    `The server is up on http://localhost:${process.env.PORT | 4000}`,
  );
});
