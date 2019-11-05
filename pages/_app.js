import React from 'react';

import App from 'next/app';
import Head from 'next/head';

import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';

import { Provider as AppContextProvider } from '../AppContext';
import theme from '../theme';

export default class DominionApp extends App {
  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <>
        <Head>
          <title>Dominion: Who Owns the Land</title>
        </Head>
        <ThemeProvider theme={theme}>
          <AppContextProvider>
            <CssBaseline />
            <Component {...pageProps} />
          </AppContextProvider>
        </ThemeProvider>
      </>
    );
  }
}