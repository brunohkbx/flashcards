import { AsyncStorage } from 'react-native';
import { pickBy, assign } from 'lodash/object';

export const DECK_STORAGE_KEY       = 'flashcards:deck';
export const SETTINGS_STORAGE_KEY   = 'flashcards:settings';
export const NOTIFICATIONS_KEY      = 'flashcards:notifications';

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

export const loadSettings = () => {
  return AsyncStorage.getItem(SETTINGS_STORAGE_KEY);
}

export const updateSettings = settings => {
  return AsyncStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
}

export const isScheduledNotification = () => {
  return AsyncStorage.getItem(NOTIFICATIONS_KEY);
}

export const scheduleNotification = () => {
  return AsyncStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(true));
}

export const unscheduleNotification = () => {
  return AsyncStorage.removeItem(NOTIFICATIONS_KEY);
}
