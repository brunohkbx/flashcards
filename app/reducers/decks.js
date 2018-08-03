import {
  CREATE_DECK
} from '../constants';

const decks = (state = initialState, action) => {
  switch(action.type) {
    case CREATE_DECK:
      let { deck } = action;

      return state.concat(deck);
    default:
      return state;
  }
}

const initialState = [
  {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  }
]

export default decks;
