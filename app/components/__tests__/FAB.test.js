import React from 'react';
import { shallow } from 'enzyme';
import { DefaultTheme } from 'react-native-paper';
import { FAB } from '../FAB';

describe('FAB', () => {
  const setup = propOverrides => {
    const defaultProps = Object.assign({
      handlePress: jest.fn(),
      theme: DefaultTheme
    }, propOverrides);

    const wrapper = shallow(<FAB {...defaultProps} />);

    const press = () => {
      wrapper.simulate('press');
    };

    return {
      defaultProps,
      wrapper,
      press
    };
  };

  it('changes background-color to primary when primary is true', () => {
    const { wrapper } = setup({ primary: true });

    expect(wrapper).toMatchSnapshot();
  });

  it('changes background-color to secondary when primary is false', () => {
    const { wrapper } = setup({ primary: false });

    expect(wrapper).toMatchSnapshot();
  });

  test('onPress calls handlePress', () => {
    const mockHandlePress = jest.fn();
    const { press } = setup({ handlePress: mockHandlePress });

    press();

    expect(mockHandlePress).toHaveBeenCalled();
  });
});
