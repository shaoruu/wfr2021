import path from 'path';

import express from 'express';
import { GraphQLServer } from 'graphql-yoga';

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

const port = process.env.PORT || 4000;
server.start(
  {
    port,
    endpoint: '/graphql',
    playground: process.env.NODE_ENV !== 'production' ? '/playground' : false,
  },
  () => {
    console.log(`The server is up on http://localhost:${port}`);
  },
);

const app = server.express;

app.use((req, res, next) => {
  if (process.env.NODE_ENV === 'production') {
    if (req.headers['x-forwarded-proto'] !== 'https')
      return res.redirect('https://' + req.headers.host + req.url);
    else return next();
  } else return next();
});

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  const publicPath = path.join(__dirname, '..', '..', 'build');

  app.use(express.static(publicPath));

  app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
  });
}
