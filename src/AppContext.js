import React from 'react';
import PropTypes from 'prop-types';

export const AppContext = React.createContext({});

export default function AppContextProvider({ children }) {
  return <AppContext.Provider>{children}</AppContext.Provider>;
}

AppContextProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};
