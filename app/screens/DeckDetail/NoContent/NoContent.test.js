import React from 'react';
import { shallow } from 'enzyme';
import NoContent from './NoContent';

describe('NoContent', () => {
  const setup = propOverrides => {
    const defaultProps = Object.assign({
      onEditButtonPress: jest.fn()
    }, propOverrides);

    const wrapper = shallow(<NoContent {...defaultProps} />);

    const pressOnEditButton = () => {
      wrapper.find('withTheme(Button)').simulate('press');
    };

    return { wrapper, pressOnEditButton };
  };

  it('renders properly', () => {
    const { wrapper } = setup();

    expect(wrapper).toMatchSnapshot();
  });

  test('editButton onPress calls onButtonPress', () => {
    const mockOnEditButtonPress = jest.fn();
    const { pressOnEditButton } = setup({ onEditButtonPress: mockOnEditButtonPress });

    pressOnEditButton();

    expect(mockOnEditButtonPress).toHaveBeenCalled();
  });
});
