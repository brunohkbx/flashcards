import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider as StoreProvider } from 'react-redux';
import Main from './app/screens/Main';
import StatusBar from './app/components/StatusBar';
import store from './app/config/store';

export default class App extends React.Component {
  render() {
    return (
      <StoreProvider store={store}>
        <PaperProvider>
          <StatusBar />
          <Main />
        </PaperProvider>
      </StoreProvider>
    );
  }
}
