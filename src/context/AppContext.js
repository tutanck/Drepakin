import { createContext } from 'react';

const AppContext = createContext();

AppContext.displayName = 'AppContext';

const AppContextProvider = AppContext.Provider;

const AppContextConsumer = AppContext.Consumer;

export { AppContext, AppContextProvider, AppContextConsumer };
