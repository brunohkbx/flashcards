import React from 'react';
import { shallow } from 'enzyme';
import { EditDeck } from '../EditDeck';

describe('EditDeck', () => {
  const setup = propOverrides => {
    const defaultProps = Object.assign({
      navigation: {
        setParams: jest.fn(),
        navigate: jest.fn()
      },
      editDeck: jest.fn(),
      deck: { id: '606a1255', questions: [], title: 'React' }
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
    });

    it('redirects to MainScreen with a flashMessage', () => {
      const mockNavigation = { navigate: jest.fn(), setParams: jest.fn() };
      const actions = { setSubmitting: jest.fn() };
      const { wrapperInstance } = setup({ navigation: mockNavigation });

      wrapperInstance.handleSubmit({ title: 'Jest is cool' }, actions);

      expect(mockNavigation.navigate).toHaveBeenCalledWith(
        'Main', { flashMessage: 'Deck has been successfully edited' }
      );
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
