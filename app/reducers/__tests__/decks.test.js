import reducer from '../decks';
import { CREATE_DECK } from '../../constants';

describe('decks reducer', () => {
  it('handles CREATE_DECK', () => {
    expect(
      reducer([], { type: CREATE_DECK, deck: { text: 'React Native' }})
    ).toEqual([
      {
        text: 'React Native'
      }
    ])
  });
})
