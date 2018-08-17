import React from 'react';
import { shallow } from 'enzyme';
import { Main } from '../Main';
import configureMockStore from 'redux-mock-store';

describe('Main', () => {
  const setup = propOverrides => {
    const defaultProps = Object.assign({
      decks: {
        '259162c6-8c55-446b-aa4f-cf9a6fcffc2f': {
          title: 'React',
          questions: [
            {
              question: 'What is React?',
              answer: 'A library for managing user interfaces'
            }
          ],
          id: '259162c6-8c55-446b-aa4f-cf9a6fcffc2f'
        }
      },
      fetchDecks: jest.fn(),
      deleteDeck: jest.fn()
    }, propOverrides)

    const store = configureMockStore()({});

    const wrapper = shallow(<Main {...defaultProps} store={store}/>);

    const pressOnFab = () => {
      wrapper
        .find('FAB')
        .dive()
        .simulate('press')
    }

    const dismissDeckFormDialog = () => {
      wrapper
        .find('Connect(Form)')
        .dive({ context: { store }})
        .dive()
        .dive()
        .find('DeckFormDialog')
        .dive()
        .simulate('dismiss')
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
      pressOnFab,
      dismissDeckFormDialog,
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

  describe('DeckFormDialog', () => {
    it('opens when FAB is pressed', () => {
      const { wrapper, pressOnFab } = setup();
      const spy = jest.spyOn(wrapper.instance(), 'openForm');

      pressOnFab();

      expect(spy).toHaveBeenCalled();
    });

    it('closes on dismiss', () => {
      const { wrapper, dismissDeckFormDialog } = setup();
      const spy = jest.spyOn(wrapper.instance(), 'closeForm');

      dismissDeckFormDialog();

      expect(spy).toHaveBeenCalled();
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
      it('closes', () => {
        const { cancelConfirmDialog, wrapper } = setup();
        const spy = jest.spyOn(wrapper.instance(), 'closeConfirmRemoveDialog');

        cancelConfirmDialog();

        expect(spy).toHaveBeenCalled();
      });
    });

    describe('Submit button', () => {
      it('closes', () => {
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
});
