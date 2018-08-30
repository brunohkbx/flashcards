import React from 'react';
import { createStackNavigator } from 'react-navigation';
import Main from '../screens/Main';
import DeckSearch from '../screens/DeckSearch';
import { primaryColor, white } from './theme';

export const RootStack =  createStackNavigator(
  {
    Main: {
      screen: Main
    },
    DeckSearch: {
      screen: DeckSearch
    }
  },
  {
    initialRouteName: 'Main',
    navigationOptions: {
      headerStyle: {
        backgroundColor: primaryColor,
      },
      headerTintColor: white
    }
  }
);
