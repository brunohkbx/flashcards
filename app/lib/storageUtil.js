import { AsyncStorage } from 'react-native';
import { pickBy } from 'lodash/object';

const DECK_STORAGE_KEY = 'flashcards:deck';

export const getDecks = () => {
  return AsyncStorage.getItem(DECK_STORAGE_KEY);
}

export const createDeck = deck => {
  return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify(deck));
}

export const deleteDeck = id => {
  getDecks()
    .then(decks => JSON.parse(decks))
    .then(decks => pickBy(decks, deck => deck.id !== id))
    .then(decks => AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(decks)));
}
