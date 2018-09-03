import React from 'react';
import { shallow } from 'enzyme';
import { EditDeck } from '../EditDeck';

describe('EditDeck', () => {
  const setup = propOverrides => {
    const defaultProps = Object.assign({
      navigation: {
        setParams: jest.fn()
      },
      editDeck: jest.fn()
    }, propOverrides)

    const wrapper = shallow(<EditDeck {...defaultProps} />);
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
      const mockEditDeck = jest.fn();
      const actions = { setSubmitting: jest.fn() };
      const { wrapperInstance } = setup({ editDeck: mockEditDeck });

      wrapperInstance.handleSubmit({}, actions);

      expect(mockEditDeck).toHaveBeenCalledWith({});
    });
  });

  describe('submitForm', () => {
    it('calls submitForm on formik ref', () => {
      const mockSubmitForm = jest.fn();
      const { wrapperInstance } = setup();
      wrapperInstance.form = { submitForm: mockSubmitForm };

      wrapperInstance.submitForm();

      expect(mockSubmitForm).toHaveBeenCalled();
    })
  })
});
