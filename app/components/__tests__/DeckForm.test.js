import React from 'react';
import { shallow } from 'enzyme';
import { FormikDeckForm, DeckForm } from '../DeckForm';

describe('FormikDeckForm', () => {
  const setup = propOverrides => {
    const defaultProps = Object.assign({
      handleSubmit: jest.fn(),
    }, propOverrides)

    const wrapper = shallow(<FormikDeckForm {...defaultProps} />);

    const submit = () => wrapper.simulate('submit');

    return {
      wrapper,
      submit
    }
  }

  it('renders properly', () => {
    const { wrapper } = setup();

    expect(wrapper).toMatchSnapshot();
  });

  test('onSubmit calls handleSubmit', () => {
    const mockHandleSubmit = jest.fn();
    const { submit } = setup({ handleSubmit: mockHandleSubmit });

    submit();

    expect(mockHandleSubmit).toHaveBeenCalled();
  });
});

describe('DeckForm', () => {
  const setup = propOverrides => {
    const defaultProps = Object.assign({
      handleChange: jest.fn(() => jest.fn),
      handleBlur: jest.fn(() => jest.fn),
      touched: {},
      errors: {},
      values: {},
    }, propOverrides)

    const wrapper = shallow(<DeckForm {...defaultProps} />);

    return {
      wrapper
    }
  }

  it('renders properly', () => {
    const { wrapper } = setup();

    expect(wrapper).toMatchSnapshot();
  });

  it('displays an error message when the input is invalid', () => {
    const { wrapper } = setup({
      touched: { title: true },
      errors: { title: 'Required' }
    });

    expect(wrapper).toMatchSnapshot();
  });
})
