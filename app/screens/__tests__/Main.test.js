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
        navigate: jest.fn(),
        getParam: jest.fn()
      }
    }, propOverrides)

    const wrapper = shallow(<Main {...defaultProps} />);
    const wrapperInstance = wrapper.instance();

    const pressOnFab = () => {
      wrapper
        .find('BottomFAB')
        .dive()
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

    const dismissSnackbar = () => {
      wrapper.find('withTheme(Snackbar)').simulate('dismiss');
    };

    return {
      defaultProps,
      wrapper,
      wrapperInstance,
      pressOnFab,
      dismissConfirmDialog,
      cancelConfirmDialog,
      confirmConfirmDialog,
      dismissSnackbar
    }
  }

  it('renders properly', () => {
    const { wrapper } = setup();

    expect(wrapper).toMatchSnapshot();
  });

  describe('componentDidMount', () => {
    it('fetches all the decks', () => {
      const mockFetchDecks = jest.fn();

      setup({ fetchDecks: mockFetchDecks });

      expect(mockFetchDecks).toHaveBeenCalled();
    });
  });

  describe('componentDidUpdate', () => {
    it('displays the snackbar if there is a flashMessage as navigation param', () => {
      const { wrapper, wrapperInstance } = setup();
      const mockNavigation = { getParam: jest.fn(() => 'foo') }
      jest.spyOn(wrapperInstance, 'setState');

      wrapper.setProps({ navigation: mockNavigation });

      expect(
        wrapperInstance.setState
      ).toHaveBeenCalledWith({ snackBarVisible: true });
    });

    it('does not display the snackbar if there is not a flashMessage as navigation param', () => {
      const { wrapper, wrapperInstance } = setup();
      const mockNavigation = { getParam: jest.fn(() => undefined) };
      jest.spyOn(wrapperInstance, 'setState');

      wrapper.setProps({ navigation: mockNavigation });

      expect(wrapperInstance.setState).not.toHaveBeenCalled();
    });
  });

  describe('openConfirmRemoveDialog', () => {
    it('sets the state correctly', () => {
      const { wrapperInstance } = setup();
      jest.spyOn(wrapperInstance, 'setState');

      wrapperInstance.openConfirmRemoveDialog('foo');

      expect(wrapperInstance.setState).toHaveBeenCalledWith(
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
      jest.spyOn(wrapperInstance, 'setState');

      wrapperInstance.closeConfirmRemoveDialog();

      expect(wrapperInstance.setState).toHaveBeenCalledWith(
        {
          confirmRemoveDialogVisible: false,
          currentDeck: null
        }
      );
    });
  });

  describe('closeSnackBar', () => {
    it('sets the state correctly', () => {
      const { wrapperInstance } = setup();
      jest.spyOn(wrapperInstance, 'setState');

      wrapperInstance.closeSnackBar();

      expect(
        wrapperInstance.setState
      ).toHaveBeenCalledWith({ snackBarVisible: false });
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
      const mockNavigation = { navigate: jest.fn(), getParam: jest.fn() }
      const { pressOnFab } = setup({ navigation: mockNavigation });

      pressOnFab();

      expect(mockNavigation.navigate).toHaveBeenCalled();
    });
  });

  describe('Movable', () => {
    it('changes toValue when snackbar is visible', () => {
      const { wrapper } = setup();

      wrapper.setState({ snackBarVisible: true })

      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('Snackbar', () => {
    test('onDismiss calls closeSnackBar', () => {
      const { dismissSnackbar, wrapperInstance } = setup();
      jest.spyOn(wrapperInstance, 'closeSnackBar');

      dismissSnackbar();

      expect(wrapperInstance.closeSnackBar).toHaveBeenCalled();
    });
  });
});
