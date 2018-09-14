import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider as StoreProvider } from 'react-redux';
import { RootStack } from './app/config/routes';
import store from './app/config/store';
import { theme } from './app/config/theme';

export default class App extends React.Component {
  render() {
    return (
      <StoreProvider store={store}>
        <PaperProvider theme={theme} >
          <RootStack />
        </PaperProvider>
      </StoreProvider>
    );
  }
}
