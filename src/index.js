import React from 'react';

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import ReactDOM from 'react-dom';

import App from './containers/App';
import { AuthProvider } from './contexts/authContext';
import './index.css';
import reportWebVitals from './reportWebVitals';

const client = new ApolloClient({
  uri: `/graphql`,
  credentials: 'same-origin',
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
