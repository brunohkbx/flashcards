import { AsyncStorage } from 'react-native';

const DECK_STORAGE_KEY = 'flashcards:deck';

export const getDecks = () => {
  return AsyncStorage.getItem(DECK_STORAGE_KEY);
}

export const createDeck = deck => {
  return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify(deck));
}
