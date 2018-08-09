import React from 'react';
import { shallow } from 'enzyme';
import TextInput from '../TextInput';

describe('TextInput', () => {
  const setup = propOverrides => {
    const defaultProps = Object.assign({
      label: 'Title',
      handleChangeText: jest.fn(),
      handleBlur: jest.fn()
    }, propOverrides)

    const wrapper = shallow(<TextInput {...defaultProps} />);

    const blur = () => {
      wrapper.find('withTheme(TextInput)').simulate('blur');
    }

    const changeText = () => {
      wrapper.find('withTheme(TextInput)').simulate('changeText');
    }

    return {
      defaultProps,
      wrapper,
      blur,
      changeText
    }
  }

  test('onChangeText calls handleChangeText', () => {
    const mockHandleChangeText = jest.fn();
    const { changeText } = setup({ handleChangeText: mockHandleChangeText });

    changeText();

    expect(mockHandleChangeText).toHaveBeenCalled();
  });

  test('onBlur calls handleBlur', () => {
    const mockHandleBlur = jest.fn();
    const { blur } = setup({ handleBlur: mockHandleBlur });

    blur();

    expect(mockHandleBlur).toHaveBeenCalled();
  });

  it('highlights itself and show ErrorText if errorMessage is present', () => {
    const { wrapper } = setup({ errorMessage: 'foo' });

    expect(wrapper).toMatchSnapshot();
  });

  it('does not highlights itself and show ErrorText if errorMessage is not present', () => {
    const { wrapper } = setup({ errorMessage: undefined });

    expect(wrapper).toMatchSnapshot();
  });
});
