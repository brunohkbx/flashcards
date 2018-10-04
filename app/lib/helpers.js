import { Platform } from 'react-native';

export const waitFor = ms => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export const getOS = () => {
  return Platform.OS;
};
