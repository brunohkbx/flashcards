import reducer from '../decks';
import {
  CREATE_DECK,
  FETCH_DECKS
} from '../../constants';

describe('decks reducer', () => {
  it('handles CREATE_DECK', () => {
    const deck = {
      '8e585af3-9db2-4f0a-9f7c-0d6f4c5ddda7': {
        id: '8e585af3-9db2-4f0a-9f7c-0d6f4c5ddda7',
        questions: [],
        title: 'React'
      }
    }

    expect(
      reducer({}, { type: CREATE_DECK, deck })
    ).toEqual(deck)
  });

  it('handles FETCH_DECKS', () => {
    const decks = {
      '8e585af3-9db2-4f0a-9f7c-0d6f4c5ddda7': {
        id: '8e585af3-9db2-4f0a-9f7c-0d6f4c5ddda7',
        questions: [],
        title: 'React'
      },
      '68f3a730-9a6f-4bf7-b8a5-096b8ebf700c': {
        id: '68f3a730-9a6f-4bf7-b8a5-096b8ebf700c',
        questions: [],
        title: 'Redux'
      }
    }

    expect(
      reducer({}, { type: FETCH_DECKS, decks })
    ).toEqual(decks)
  });

  it('handles default state', () => {
    expect(
      reducer(undefined, { type: undefined })
    ).toEqual({})
  });
})
