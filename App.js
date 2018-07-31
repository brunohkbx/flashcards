import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import Main from './app/screens/Main';

export default class App extends React.Component {
  render() {
    return (
      <PaperProvider>
        <Main />
      </PaperProvider>
    );
  }
}
