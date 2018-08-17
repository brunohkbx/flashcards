import {
  CREATE_DECK,
  FETCH_DECKS,
  DELETE_DECK
} from '../constants';

import { pickBy } from 'lodash/object';

const decks = (state = {}, action) => {
  switch(action.type) {
    case CREATE_DECK:
      return {...state, ...action.deck};
    case FETCH_DECKS:
      return {...state, ...action.decks};
    case DELETE_DECK:
      return pickBy(state, deck => deck.id !== action.id);
    default:
      return state;
  }
}

export default decks;
