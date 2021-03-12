import path from 'path';

import express from 'express';
import { GraphQLServer, PubSub } from 'graphql-yoga';

import resolvers from './graphql/resolvers';
import { UserModel } from './models';
import mongo from './mongo';
import Helpers from './utils/helpers';

require('dotenv-defaults').config();

mongo.connect();

const server = new GraphQLServer({
  typeDefs: path.join(__dirname, 'graphql', 'schema.graphql'),
  resolvers,
  async context(request) {
    return {
      user: await UserModel.findById(Helpers.getUserId(request)),
    };
  },
});

server.start(
  {
    port: process.env.PORT || 4000,
    endpoint: '/graphql',
    playground: process.env.NODE_ENV !== 'production' ? '/graphql' : false,
  },
  () => {
    console.log(
      `The server is up on http://localhost:${process.env.PORT | 4000}`,
    );
  },
);

const app = server.express;

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  const publicPath = path.join(__dirname, '..', '..', 'build');

  app.use(express.static(publicPath));

  app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
  });
}
