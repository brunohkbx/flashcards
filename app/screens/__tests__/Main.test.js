import React from 'react';
import { shallow } from 'enzyme';
import { Main } from '../Main';

describe('Main', () => {
  const setup = propOverrides => {
    const defaultProps = Object.assign({
      decks: [
        {
          title: 'React',
          questions: [
            {
              question: 'What is React?',
              answer: 'A library for managing user interfaces'
            }
          ],
          id: '259162c6-8c55-446b-aa4f-cf9a6fcffc2f'
        }
      ],
      createDeck: jest.fn(),
      fetchDecks: jest.fn(),
      deleteDeck: jest.fn(),
      navigation: {
        navigate: jest.fn()
      }
    }, propOverrides)

    const wrapper = shallow(<Main {...defaultProps} />);
    const wrapperInstance = wrapper.instance();

    const pressOnFab = () => {
      wrapper
        .find('FAB')
        .dive()
        .simulate('press')
    }

    const dismissConfirmDialog = () => {
      wrapper
        .find('ConfirmDialog')
        .dive()
        .simulate('dismiss')
    }

    const cancelConfirmDialog = () => {
      wrapper
        .find('ConfirmDialog')
        .dive()
        .find('DialogActions')
        .childAt(0)
        .simulate('press')
    }

    const confirmConfirmDialog = () => {
      wrapper
        .find('ConfirmDialog')
        .dive()
        .find('DialogActions')
        .childAt(1)
        .simulate('press')
    }

    return {
      defaultProps,
      wrapper,
      wrapperInstance,
      pressOnFab,
      dismissConfirmDialog,
      cancelConfirmDialog,
      confirmConfirmDialog
    }
  }

  it('renders properly', () => {
    const { wrapper } = setup();

    expect(wrapper).toMatchSnapshot();
  });

  it('fetches all the decks when component is mounted', () => {
    const mockFetchDecks = jest.fn();
    const { wrapper } = setup({ fetchDecks: mockFetchDecks });

    expect(mockFetchDecks).toHaveBeenCalled();
  });

  describe('openConfirmRemoveDialog', () => {
    it('sets the state correctly', () => {
      const { wrapperInstance } = setup();
      const spy = jest.spyOn(wrapperInstance, 'setState');

      wrapperInstance.openConfirmRemoveDialog('foo');

      expect(spy).toHaveBeenCalledWith(
        {
          confirmRemoveDialogVisible: true,
          currentDeck: 'foo'
        }
      );
    });
  });

  describe('closeConfirmRemoveDialog', () => {
    it('sets the state correctly', () => {
      const { wrapperInstance } = setup();
      const spy = jest.spyOn(wrapperInstance, 'setState');

      wrapperInstance.closeConfirmRemoveDialog();

      expect(spy).toHaveBeenCalledWith(
        {
          confirmRemoveDialogVisible: false,
          currentDeck: null
        }
      );
    });
  });

  describe('renderItem', () => {
    it('renders correctly a Deck', () => {
      const { wrapperInstance } = setup();
      const item = { item: { title: 'foo', questions: [] }};

      expect(wrapperInstance.renderItem(item));
    });
  });

  describe('ConfirmDialog', () => {
    it('closes on dismiss', () => {
      const { dismissConfirmDialog, wrapper } = setup();
      const spy = jest.spyOn(wrapper.instance(), 'closeConfirmRemoveDialog');

      dismissConfirmDialog();

      expect(spy).toHaveBeenCalled();
    });

    describe('Cancel button', () => {
      it('closes on press', () => {
        const { cancelConfirmDialog, wrapper } = setup();
        const spy = jest.spyOn(wrapper.instance(), 'closeConfirmRemoveDialog');

        cancelConfirmDialog();

        expect(spy).toHaveBeenCalled();
      });
    });

    describe('Submit button', () => {
      it('closes on press', () => {
        const { confirmConfirmDialog, wrapper } = setup();
        const spy = jest.spyOn(wrapper.instance(), 'closeConfirmRemoveDialog');

        confirmConfirmDialog();

        expect(spy).toHaveBeenCalled();
      });

      it('deletes the deck', () => {
        const mockDeleteDecks = jest.fn();
        const { confirmConfirmDialog } = setup({ deleteDeck: mockDeleteDecks });

        confirmConfirmDialog();

        expect(mockDeleteDecks).toHaveBeenCalled();
      });
    });
  });

  describe('FAB button', () => {
    it('navigates to CreateDeck screen', () => {
      const mockNavigation = { navigate: jest.fn() }
      const { pressOnFab } = setup({ navigation: mockNavigation });

      pressOnFab();

      expect(mockNavigation.navigate).toHaveBeenCalled();
    });
  });
});
