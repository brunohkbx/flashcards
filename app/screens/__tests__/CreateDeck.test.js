import React from 'react';
import { shallow } from 'enzyme';
import { CreateDeck } from '../CreateDeck';

describe('CreateDeck', () => {
  const setup = propOverrides => {
    const defaultProps = Object.assign({
      navigation: {
        setParams: jest.fn()
      },
      createDeck: jest.fn()
    }, propOverrides)

    const wrapper = shallow(<CreateDeck {...defaultProps} />);
    const wrapperInstance = wrapper.instance();

    return {
      wrapper,
      wrapperInstance
    }
  }

  it('renders properly', () => {
    const { wrapper } = setup();

    expect(wrapper).toMatchSnapshot();
  });

  it('assigns submitForm to navigations params when component did mount', () => {
    const mockNavigation = { setParams: jest.fn() }
    const { wrapperInstance } = setup({ navigation: mockNavigation });

    expect(
      mockNavigation.setParams
    ).toHaveBeenCalledWith({ submitForm: wrapperInstance.submitForm });
  });

  describe('handleSubmit', () => {
    it('calls createDeck', () => {
      const mockCreateDeck = jest.fn();
      const actions = { setSubmitting: jest.fn() };
      const { wrapperInstance } = setup({ createDeck: mockCreateDeck });

      wrapperInstance.handleSubmit({}, actions);

      expect(mockCreateDeck).toHaveBeenCalledWith({});
    });
  });

  describe('submitForm', () => {
    it('calls submitForm on formik ref', () => {
      const mockSubmitForm = jest.fn();
      const { wrapperInstance } = setup();
      wrapperInstance.form = { submitForm: mockSubmitForm };

      wrapperInstance.submitForm();

      expect(mockSubmitForm).toHaveBeenCalled();
    });
  });

  describe('setFormRef', () => {
    it('assigns a ref to this.form', () => {
      const mockForm = jest.fn();
      const { wrapperInstance } = setup();

      wrapperInstance.setFormRef(mockForm);

      expect(wrapperInstance.form).toEqual(mockForm);
    });
  });
});
