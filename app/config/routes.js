import React from 'react';
import { createStackNavigator } from 'react-navigation';
import Main from '../screens/Main';
import DeckSearch from '../screens/DeckSearch';
import CreateDeck from '../screens/CreateDeck';
import EditDeck from '../screens/EditDeck';
import { primaryColor, white } from './theme';

export const RootStack =  createStackNavigator(
  {
    Main: {
      screen: Main
    },
    DeckSearch: {
      screen: DeckSearch
    },
    CreateDeck: {
      screen: CreateDeck,
      navigationOptions: {
        title: 'Create Deck'
      }
    },
    EditDeck: {
      screen: EditDeck,
      navigationOptions: {
        title: 'Edit Deck'
      }
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
