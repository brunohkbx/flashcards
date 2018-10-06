import { createStackNavigator } from 'react-navigation';
import Main from '../screens/Main';
import CreateDeck from '../screens/CreateDeck';
import EditDeck from '../screens/EditDeck';
import DeckDetail from '../screens/DeckDetail';
import Quiz from '../screens/Quiz/Quiz';
import { primaryColor, white } from './theme';

export const RootStack =  createStackNavigator(
  {
    Main: {
      screen: Main,
      navigationOptions: {
        title: 'Flashcards'
      }
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
    },
    DeckDetail: {
      screen: DeckDetail
    },
    Quiz: {
      screen: Quiz,
      navigationOptions: {
        title: 'Quiz'
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
