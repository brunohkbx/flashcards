import React from 'react';
import { shallow } from 'enzyme';
import FormInput from './FormInput';

describe('FormInput', () => {
  const setup = propOverrides => {
    const defaultProps = Object.assign({
      field: { name: 'title', value: 'React' },
      form: { touched: {}, errors: {} }
    }, propOverrides);

    const wrapper = shallow(<FormInput {...defaultProps} />);

    return {
      wrapper
    };
  };

  it('renders properly', () => {
    const { wrapper } =  setup();

    expect(wrapper).toMatchSnapshot();
  });

  it('displays an error message when the input is invalid', () => {
    const { wrapper } = setup({
      form: {
        touched: { title: true },
        errors: { title: 'Required' }
      }
    });

    expect(wrapper).toMatchSnapshot();
  });
});
