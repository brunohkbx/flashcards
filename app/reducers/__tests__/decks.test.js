import reducer from '../decks';
import {
  CREATE_DECK,
  FETCH_DECKS,
  DELETE_DECK
} from '../../constants';

describe('decks reducer', () => {
  const setup = () => {
    const deck = {
      '1': {
        id: '1',
        questions: [],
        title: 'React'
      }
    }

    const decks = {
      '1': {
        id: '1',
        questions: [],
        title: 'React'
      },
      '2': {
        id: '2',
        questions: [],
        title: 'Redux'
      }
    }

    return {
      deck,
      decks
    }
  }

  it('handles CREATE_DECK', () => {
    const { deck } = setup();

    expect(
      reducer({}, { type: CREATE_DECK, deck })
    ).toEqual(deck)
  });

  it('handles FETCH_DECKS', () => {
    const { decks }  = setup();

    expect(
      reducer({}, { type: FETCH_DECKS, decks })
    ).toEqual(decks)
  });

  it('handles DELETE_DECK', () => {
    const { decks }  = setup();

    expect(
      reducer(decks, { type: DELETE_DECK, id: '1' })
    ).toEqual({
      '2': {
        id: '2',
        questions: [],
        title: 'Redux'
      }
    })
  });

  it('handles default state', () => {
    expect(
      reducer(undefined, { type: undefined })
    ).toEqual({})
  });
})
