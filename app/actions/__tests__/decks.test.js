import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as StorageUtil from '../../lib/storageUtil';
import * as actions from '../../actions';
import {
  CREATE_DECK,
  FETCH_DECKS,
  DELETE_DECK,
  EDIT_DECK
} from '../../constants';

describe('decks actions', () => {
  const setup = () => {
    const middlewares = [thunk];
    const mockStore = configureMockStore(middlewares);
    const store = mockStore({ decks: {} });

    return {
      store
    }
  }

  describe('createDeck', () => {
    it('stores the deck in the storage and dispatches CREATE_DECK', async () => {
      const { store } = setup();
      jest.spyOn(StorageUtil, 'createDeck');

      await store.dispatch(actions.createDeck({}));

      expect(StorageUtil.createDeck).toHaveBeenCalled();
      expect(store.getActions()[0]).toHaveProperty('type', CREATE_DECK);
    });
  });

  describe('fetchDecks', () => {
    it('fetches all decks from storage and dispatches FETCH_DECKS', async () => {
      const { store } = setup();
      jest.spyOn(StorageUtil, 'getDecks');

      await store.dispatch(actions.fetchDecks());

      expect(StorageUtil.getDecks).toHaveBeenCalled();
      expect(store.getActions()[0]).toHaveProperty('type', FETCH_DECKS);
    });
  });

  describe('deleteDeck', () => {
    it('deletes the deck from storage and dispatches DELETE_DECK', async () => {
      const { store } = setup();
      jest.spyOn(StorageUtil, 'deleteDeck');

      await store.dispatch(actions.deleteDeck('1'));

      expect(StorageUtil.deleteDeck).toHaveBeenCalledWith('1');
      expect(store.getActions()[0]).toEqual({ 'type': DELETE_DECK, id: '1' });
    });
  });

  describe('editDeck', () => {
    it('edits the deck from storage and dispatches EDIT_DECK', async () => {
      const { store } = setup();
      const deck = { title: 'foo', id: '1' };
      jest.spyOn(StorageUtil, 'editDeck');

      await store.dispatch(actions.editDeck(deck));

      expect(StorageUtil.editDeck).toHaveBeenCalledWith({ '1': deck });
      expect(store.getActions()[0]).toEqual({
        'type': EDIT_DECK,
        deck: { '1': deck }
      });
    });
  });
})
