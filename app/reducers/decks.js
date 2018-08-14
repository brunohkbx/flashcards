import {
  CREATE_DECK,
  FETCH_DECKS
} from '../constants';

const decks = (state = {}, action) => {
  switch(action.type) {
    case CREATE_DECK:
      return {...state, ...action.deck};
    case FETCH_DECKS:
      return {...state, ...action.decks};
    default:
      return state;
  }
}

export default decks;
