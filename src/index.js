import React from 'react';
import ReactDOM from 'react-dom';

import { MuiThemeProvider, CssBaseline } from '@material-ui/core';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks';

import App from './App';
import * as serviceWorker from './serviceWorker';

import AppContextProvider from './AppContext';

import Theme from './Theme';

const client = new ApolloClient({
  uri: 'https://graphql.hurumap.org/graphql',
  onError: ({ graphQLErrors, networkError }) => {
    if (process.env.NODE_ENV === 'development') {
      if (graphQLErrors) {
        graphQLErrors.map(({ message, locations, path }) =>
          // eslint-disable-next-line no-console
          console.error(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          )
        );
      }
      // eslint-disable-next-line no-console
      if (networkError) console.error(`[Network error]: ${networkError}`);
    } else {
      window.history.replaceState(
        graphQLErrors || networkError,
        'Error',
        '/error'
      );
    }
  }
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <ApolloHooksProvider client={client}>
      <MuiThemeProvider theme={Theme}>
        <AppContextProvider>
          <CssBaseline />
          <App />
        </AppContextProvider>
      </MuiThemeProvider>
    </ApolloHooksProvider>
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
