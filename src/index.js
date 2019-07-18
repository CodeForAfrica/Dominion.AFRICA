import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import * as serviceWorker from "./serviceWorker";

import { MuiThemeProvider, CssBaseline } from "@material-ui/core";
import AppContextProvider from "./AppContext";

import Theme from './Theme';

ReactDOM.render(
  <MuiThemeProvider theme={Theme}>
    <AppContextProvider>
      <CssBaseline />
      <App />
    </AppContextProvider>
  </MuiThemeProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
