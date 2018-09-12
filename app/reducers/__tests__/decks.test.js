import reducer from '../decks';
import {
  CREATE_DECK,
  FETCH_DECKS,
  DELETE_DECK,
  EDIT_DECK
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

  it('handles EDIT_DECK', () => {
    const { deck }  = setup();
    const newDeck = {
      '1': {
        title: 'React 16',
        id: '1'
      }
    }

    expect(
      reducer(deck, { type: EDIT_DECK, deck: newDeck })
    ).toEqual({
      '1': {
        id: '1',
        title: 'React 16'
      }
    })
  });

  it('handles default state', () => {
    expect(
      reducer(undefined, { type: undefined })
    ).toEqual({})
  });
})
