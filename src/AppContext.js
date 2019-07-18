import React from "react";

export const AppContext = React.createContext({});

export default function AppContextProvider({ children }) {
  return <AppContext.Provider>{children}</AppContext.Provider>;
}
