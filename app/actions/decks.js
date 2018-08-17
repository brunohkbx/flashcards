import uuid from 'uuid';
import * as StorageUtil from '../lib/storageUtil';

import {
  CREATE_DECK,
  FETCH_DECKS,
  DELETE_DECK
} from '../constants';

export const createDeck = ({ title }) => dispatch => {
  const id = uuid();

  const deck = {
    [id]: {
      title,
      questions: [],
      id
    }
  }

  StorageUtil.createDeck(deck);
  dispatch({ type: CREATE_DECK, deck });
}

export const fetchDecks = () => dispatch => {
  return StorageUtil
    .getDecks()
    .then(decks => dispatch({
      type: FETCH_DECKS,
      decks: JSON.parse(decks)
    }))
}

export const deleteDeck = id => dispatch => {
  StorageUtil.deleteDeck(id);
  dispatch({ type: DELETE_DECK, id });
}
