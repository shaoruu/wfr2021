import React from 'react';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
  split,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import ReactDOM from 'react-dom';

import App from './containers/App';
import { AuthProvider } from './contexts/authContext';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { getToken } from './utils/getToken';

const { hostname } = window.location;
const httpLink = createHttpLink({
  uri: `http://${hostname}:4000`,
  credentials: 'same-origin',
});

const wsLink = new WebSocketLink({
  uri: `ws://${hostname}:4000`,
  options: {
    reconnect: true,
  },
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

const authLink = setContext((_, { headers }) => {
  const token = getToken();

  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  connectToDevTools: process.browser,
  ssrMode: !process.browser,
  ssrForceFetchDelay: 100,
  link: authLink.concat(splitLink),
  cache: new InMemoryCache().restore({}),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <AuthProvider>
      {/* <React.StrictMode> */}
      <App />
      {/* </React.StrictMode> */}
    </AuthProvider>
  </ApolloProvider>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
