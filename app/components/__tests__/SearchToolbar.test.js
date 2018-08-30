import React from 'react';
import { shallow } from 'enzyme';
import SearchToolbar from '../SearchToolbar';

describe('SearchToolbar', () => {
  const setup = propOverrides => {
    const defaultProps = Object.assign({
      handleIconPress: jest.fn()
    }, propOverrides)

    const wrapper = shallow(<SearchToolbar {...defaultProps} />);

    const changeText = () => {
      wrapper
        .find('withTheme(Searchbar)')
        .simulate('changeText');
    }

    const iconPress = () => {
      wrapper
        .find('withTheme(Searchbar)')
        .simulate('iconPress');
    }

    return {
      wrapper,
      changeText,
      iconPress
    }
  }

  it('renders property', () => {
    const { wrapper } = setup();

    expect(wrapper).toMatchSnapshot();
  });

  test('onChangeText calls handleChangeText', () => {
    const mockHandleChangeText = jest.fn();
    const { changeText } = setup({ handleChangeText: mockHandleChangeText });

    changeText();

    expect(mockHandleChangeText).toHaveBeenCalled();
  });

  test('onIconPress calls handleIconPress', () => {
    const mockHandleIconPress = jest.fn();
    const { iconPress } = setup({ handleIconPress: mockHandleIconPress });

    iconPress();

    expect(mockHandleIconPress).toHaveBeenCalled();
  });
});
