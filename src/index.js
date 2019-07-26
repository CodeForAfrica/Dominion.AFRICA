import React from 'react';
import ReactDOM from 'react-dom';

import { MuiThemeProvider, CssBaseline } from '@material-ui/core';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import App from './App';
import * as serviceWorker from './serviceWorker';

import AppContextProvider from './AppContext';

import Theme from './Theme';

const client = new ApolloClient({ uri: 'https://graphql.hurumap.org/graphql' });

ReactDOM.render(
  <ApolloProvider client={client}>
    <MuiThemeProvider theme={Theme}>
      <AppContextProvider>
        <CssBaseline />
        <App />
      </AppContextProvider>
    </MuiThemeProvider>
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
