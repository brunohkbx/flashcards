import { createStackNavigator } from 'react-navigation';
import { Colors, DefaultTheme } from 'react-native-paper';
import Main from '../screens/Main';
import CreateDeck from '../screens/CreateDeck';
import EditDeck from '../screens/EditDeck';
import DeckDetail from '../screens/DeckDetail';
import Quiz from '../screens/Quiz/Quiz';

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
        backgroundColor: DefaultTheme.colors.primary,
      },
      headerTintColor: Colors.white
    }
  }
);
