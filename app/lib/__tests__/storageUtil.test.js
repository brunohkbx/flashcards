import * as storageUtil from '../storageUtil';
import { AsyncStorage } from 'react-native';

describe('Storage deck actions', () => {
  describe('getDecks', () => {
    it('calls getItem from AsyncStorage', () => {
      jest.spyOn(AsyncStorage, 'getItem');

      storageUtil.getDecks();

      expect(
        AsyncStorage.getItem
      ).toHaveBeenCalledWith(storageUtil.DECK_STORAGE_KEY);
    });
  });

  describe('createDeck', () => {
    const setup = () => {
      const deck = {
        '281f030c': {
          title: 'React',
          questions: [
            {
              question: 'What is React?',
              answer: 'A library for managing user interfaces',
              id: 'ed97271d'
            }
          ],
          id: '281f030c'
        }
      };

      return { deck };
    };

    it('calls mergeItem from AsyncStorage to merge a new deck', () => {
      const deck = setup();
      jest.spyOn(AsyncStorage, 'mergeItem');

      storageUtil.createDeck(deck);

      expect(AsyncStorage.mergeItem).toHaveBeenCalledWith(
        storageUtil.DECK_STORAGE_KEY,
        JSON.stringify(deck)
      );
    });
  });

  describe('deleteDeck', () => {
    const setup = () => {
      const decks = {
        '281f030c': {
          title: 'React',
          questions: [
            {
              question: 'What is React?',
              answer: 'A library for managing user interfaces',
              id: 'ed97271d'
            }
          ],
          id: '281f030c'
        },
        '81f3d3fb': {
          title: 'JavaScript',
          questions: [
            {
              question: 'What is a closure?',
              answer: 'The combination of a function and the ' +
                'lexical environment within which that function was declared.',
              id: 'd408e195'
            }
          ],
          id: '81f3d3fb'
        }
      };

      const expectedResult = JSON.stringify({
        '81f3d3fb': {
          title: 'JavaScript',
          questions: [
            {
              question: 'What is a closure?',
              answer: 'The combination of a function and the ' +
                'lexical environment within which that function was declared.',
              id: 'd408e195'
            }
          ],
          id: '81f3d3fb'
        }
      });

      return { decks, expectedResult };
    };

    beforeEach(() => {
      const { decks } = setup();

      jest.spyOn(AsyncStorage, 'getItem').mockImplementation(() => {
        return Promise.resolve(JSON.stringify(decks));
      });

      jest.spyOn(AsyncStorage, 'setItem');
    });

    it('calls setItem from AsyncStorage with an array of decks excluding the given deck', async () => {
      const { expectedResult } = setup();

      await storageUtil.deleteDeck('281f030c');

      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        storageUtil.DECK_STORAGE_KEY,
        expectedResult
      );
    });
  });

  describe('editDeck', () => {
    const setup = () => {
      const decks = {
        '281f030c': {
          title: 'React',
          questions: [
            {
              question: 'What is React?',
              answer: 'A library for managing user interfaces',
              id: 'ed97271d'
            }
          ],
          id: '281f030c'
        }
      };

      const editedDeck = {
        '281f030c': {
          title: 'React',
          questions: [
            {
              question: 'Where do you make Ajax requests in React?',
              answer: 'The componentDidMount lifecycle event',
              id: '31908dbd'
            }
          ],
          id: '281f030c'
        }
      };

      return { decks, editedDeck };
    };

    beforeEach(() => {
      const { decks } = setup();

      jest.spyOn(AsyncStorage, 'getItem').mockImplementation(() => {
        return Promise.resolve(JSON.stringify(decks));
      });

      jest.spyOn(AsyncStorage, 'setItem');
    });

    it('assigns a deck with the new deck data and calls setItem from AsyncStorage', async () => {
      const { editedDeck } = setup();

      await storageUtil.editDeck(editedDeck);

      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        storageUtil.DECK_STORAGE_KEY,
        JSON.stringify(editedDeck)
      );
    });
  });
});

describe('Storage settings actions', () => {
  describe('loadSettings', () => {
    it('calls getItem from AsyncStorage', () => {
      jest.spyOn(AsyncStorage, 'getItem');

      storageUtil.loadSettings();

      expect(
        AsyncStorage.getItem
      ).toHaveBeenCalledWith(storageUtil.SETTINGS_STORAGE_KEY);
    });
  });

  describe('updateSettings', () => {
    it('calls setItem from AsyncStorage with the new settings', () => {
      const settings = { receiveNotifications: false };
      jest.spyOn(AsyncStorage, 'setItem');

      storageUtil.updateSettings(settings);

      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        storageUtil.SETTINGS_STORAGE_KEY,
        JSON.stringify(settings)
      );
    });
  });
});

describe('Storage notifications actions', () => {
  describe('isScheduledNotification', () => {
    it('calls getItem from AsyncStorage', () => {
      jest.spyOn(AsyncStorage, 'getItem');

      storageUtil.isScheduledNotification();

      expect(
        AsyncStorage.getItem
      ).toHaveBeenCalledWith(storageUtil.NOTIFICATIONS_KEY);
    });
  });

  describe('scheduleNotification', () => {
    it('calls setItem from AsyncStorage with true', () => {
      jest.spyOn(AsyncStorage, 'setItem');

      storageUtil.scheduleNotification();

      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        storageUtil.NOTIFICATIONS_KEY,
        JSON.stringify(true)
      );
    });
  });

  describe('unscheduleNotification', () => {
    it('calls removeItem from AsyncStorage', () => {
      jest.spyOn(AsyncStorage, 'removeItem');

      storageUtil.unscheduleNotification();

      expect(AsyncStorage.removeItem).toHaveBeenCalledWith(
        storageUtil.NOTIFICATIONS_KEY,
      );
    });
  });
});
