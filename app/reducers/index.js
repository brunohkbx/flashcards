import { combineReducers } from 'redux';
import decks from './decks';
import settings from './settings';

export default combineReducers({
  decks,
  settings
});
