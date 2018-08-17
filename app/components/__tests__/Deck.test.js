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
      handleDeletePress: jest.fn()
    }, propOverrides)

    const wrapper = shallow(<Deck {...defaultProps} />);

    const deleteDeck = () => {
      wrapper
        .find('CardActions')
        .childAt(1)
        .simulate('press');
    }

    return {
      defaultProps,
      wrapper,
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

  test('delete onPress calls handleDeletePress', () => {
    const mockHandleDeletePress = jest.fn();
    const { deleteDeck } = setup({ handleDeletePress: mockHandleDeletePress });

    deleteDeck();

    expect(mockHandleDeletePress).toHaveBeenCalled();
  });
});
