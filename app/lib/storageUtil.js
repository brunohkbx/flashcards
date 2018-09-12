import { AsyncStorage } from 'react-native';
import { pickBy, assign } from 'lodash/object';

const DECK_STORAGE_KEY = 'flashcards:deck';

export const getDecks = () => {
  return AsyncStorage.getItem(DECK_STORAGE_KEY);
}

export const createDeck = deck => {
  return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify(deck));
}

export const deleteDeck = id => {
  return getDecks()
    .then(decks => JSON.parse(decks))
    .then(decks => pickBy(decks, deck => deck.id !== id))
    .then(decks => AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(decks)));
}

export const editDeck = deck => {
  return getDecks()
    .then(decks => JSON.parse(decks))
    .then(decks => assign(decks, deck))
    .then(decks => AsyncStorage.setItem(
      DECK_STORAGE_KEY, JSON.stringify(decks)
    ));
}
