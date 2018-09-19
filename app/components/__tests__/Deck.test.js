import React from 'react';
import { shallow } from 'enzyme';
import Deck from '../Deck';
import pluralize from 'pluralize';
import { capitalize } from '../../lib/stringUtil';

jest.mock('pluralize');
jest.mock('../../lib/stringUtil');

describe('Deck', () => {
  const setup = propOverrides => {
    const defaultProps = Object.assign({
      title: 'foo',
      flashcardsCount: 5,
      handleEditPress: jest.fn(),
      handleDeletePress: jest.fn(),
      onPress: jest.fn()
    }, propOverrides)

    const wrapper = shallow(<Deck {...defaultProps} />);

    const editDeck = () => {
      wrapper
        .find('CardActions')
        .childAt(0)
        .simulate('press');
    }

    const deleteDeck = () => {
      wrapper
        .find('CardActions')
        .childAt(1)
        .simulate('press');
    }

    return {
      defaultProps,
      wrapper,
      editDeck,
      deleteDeck
    }
  }

  it('renders properly', () => {
    const { wrapper } =  setup();

    expect(wrapper).toMatchSnapshot();
  });

  it('capitalizes the title', () => {
    const { defaultProps, wrapper } =  setup();

    expect(capitalize).toHaveBeenCalledWith(defaultProps.title);
  });

  it('pluralizes the deck description based on flashcardsCount', () => {
    const { defaultProps, wrapper } =  setup();

    expect(pluralize).toHaveBeenCalledWith('card', defaultProps.flashcardsCount, true);
  });

  test('edit onPress calls handleEditPress', () => {
    const mockHandleEditPress = jest.fn();
    const { editDeck } = setup({ handleEditPress: mockHandleEditPress });

    editDeck();

    expect(mockHandleEditPress).toHaveBeenCalled();
  });

  test('delete onPress calls handleDeletePress', () => {
    const mockHandleDeletePress = jest.fn();
    const { deleteDeck } = setup({ handleDeletePress: mockHandleDeletePress });

    deleteDeck();

    expect(mockHandleDeletePress).toHaveBeenCalled();
  });
});
