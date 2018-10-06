import {
  CREATE_DECK,
  FETCH_DECKS,
  DELETE_DECK,
  EDIT_DECK
} from '../constants';

import { pickBy, assign } from 'lodash/object';

const decks = (state = {}, action) => {
  switch(action.type) {
    case CREATE_DECK:
      return {...state, ...action.deck};
    case FETCH_DECKS:
      return {...state, ...action.decks};
    case DELETE_DECK:
      return pickBy(state, deck => deck.id !== action.id);
    case EDIT_DECK:
      return assign({}, state, action.deck);
    default:
      return state;
  }
};

export default decks;
