import React from 'react';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import ReactDOM from 'react-dom';

import App from './containers/App';
import { AuthProvider } from './contexts/authContext';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { getToken } from './utils';

const httpLink = createHttpLink({
  uri: '/graphql',
  credentials: 'same-origin',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = getToken();
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          pledges: {
            merge(_, incoming) {
              return incoming;
            },
          },
          me: {
            merge(_, incoming) {
              return incoming;
            },
          },
        },
      },
    },
  }).restore({}),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <AuthProvider>
      <App />
    </AuthProvider>
  </ApolloProvider>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
