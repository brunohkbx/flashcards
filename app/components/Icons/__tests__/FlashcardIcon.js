import React from 'react';
import { shallow } from 'enzyme';
import FlashcardIcon from '../FlashcardIcon';

describe('DeleteIcon', () => {
  const setup = propOverrides => {
    const defaultProps = Object.assign({
      onPress: jest.fn()
    }, propOverrides);

    const wrapper = shallow(<FlashcardIcon {...defaultProps} />);

    const press = () => wrapper.simulate('press');

    return { wrapper, press };
  };

  it('renders properly', () => {
    const { wrapper } = setup();

    expect(wrapper).toMatchSnapshot();
  });


  test('onPress calls onPress', () => {
    const mockOnPress = jest.fn();
    const { press } = setup({ onPress: mockOnPress });

    press();

    expect(mockOnPress).toHaveBeenCalled();
  });
});
