import React from 'react';
import { createStackNavigator } from 'react-navigation';
import Main from '../screens/Main';
import SearchIcon from '../components/header/SearchIcon';
import { primaryColor, white } from './theme';

export const RootStack =  createStackNavigator(
  {
    Main: {
      screen: Main,
      navigationOptions: {
        title: 'Flashcards',
        headerRight:  <SearchIcon />
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
