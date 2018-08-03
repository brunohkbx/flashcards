import {
  CREATE_DECK
} from '../constants';

export const createDeck = ({ title }) => ({
  type: CREATE_DECK,
  deck: {
    title,
    questions: []
  }
})
