import { GraphQLServer, PubSub } from 'graphql-yoga';
import path from 'path';
import mongo from './mongo';
import permissions from './permissions';
import Helpers from './utils/helpers';

require('dotenv-defaults').config();

mongo.connect();

const pubsub = new PubSub();

const server = new GraphQLServer({
  typeDefs: path.join(__dirname, 'graphql', 'schema.graphql'),
  resolvers: [],
  middlewares: [permissions],
  context(request) {
    return {
      userId: Helpers.getUserId(request),
      pubsub,
    };
  },
});

server.start({ port: process.env.PORT | 4000 }, () => {
  console.log(
    `The server is up on http://localhost:${process.env.PORT | 4000}`,
  );
});
