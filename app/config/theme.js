import { Easing } from 'react-native';
import { DefaultTheme, Colors } from 'react-native-paper';

export const primaryColor = DefaultTheme.colors.primary;
export const white = Colors.white;

export const theme = {
  ...DefaultTheme,
  transitions: {
    duration: {
      enteringScreen: 225,
      leavingScreen: 195
    },
    easing: {
      easeOut: Easing.bezier(0.0, 0, 0.2, 1),
      sharp: Easing.bezier(0.4, 0, 0.6, 1)
    },
  }
};
