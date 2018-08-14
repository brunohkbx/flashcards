import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as StorageUtil from '../../lib/storageUtil';
import * as actions from '../../actions';
import { CREATE_DECK, FETCH_DECKS } from '../../constants';

describe('decks actions', () => {
  const setup = () => {
    const middlewares = [thunk];
    const mockStore = configureMockStore(middlewares);
    const store = mockStore({ decks: {} });
    const data = { title: 'React' };

    return {
      store,
      data
    }
  }

  describe('createDeck', () => {
    it('stores the deck in the database and dispatches CREATE_DECK', async () => {
      const { store, data } = setup();
      jest.spyOn(StorageUtil, 'createDeck');

      await store.dispatch(actions.createDeck(data));

      expect(StorageUtil.createDeck).toHaveBeenCalled();
      expect(store.getActions()[0]).toHaveProperty('type', CREATE_DECK);
    });
  });

  describe('fetchDecks', () => {
    it('fetches the decks from database and dispatches FETCH_DECKS', async () => {
      const { store } = setup();
      jest.spyOn(StorageUtil, 'getDecks');

      await store.dispatch(actions.fetchDecks());

      expect(StorageUtil.getDecks).toHaveBeenCalled();
      expect(store.getActions()[0]).toHaveProperty('type', FETCH_DECKS);
    });
  });
})
