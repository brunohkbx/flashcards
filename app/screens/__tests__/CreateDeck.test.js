import React from 'react';
import { shallow } from 'enzyme';
import { CreateDeck } from '../CreateDeck';
import * as helpers from '../../lib/helpers';

describe('CreateDeck', () => {
  const setup = propOverrides => {
    const defaultProps = Object.assign({
      navigation: {
        setParams: jest.fn(),
        navigate: jest.fn()
      },
      createDeck: jest.fn()
    }, propOverrides);

    const wrapper = shallow(<CreateDeck {...defaultProps} />);
    const wrapperInstance = wrapper.instance();

    return {
      wrapper,
      wrapperInstance
    };
  };

  it('renders properly', () => {
    const { wrapper } = setup();

    expect(wrapper).toMatchSnapshot();
  });

  it('assigns submitForm to navigations params when component did mount', () => {
    const mockNavigation = { setParams: jest.fn() };
    const { wrapperInstance } = setup({ navigation: mockNavigation });

    expect(
      mockNavigation.setParams
    ).toHaveBeenCalledWith({ submitForm: wrapperInstance.submitForm });
  });

  describe('handleSubmit', () => {
    it('displays the progressDialog', async () => {
      const mockCreateDeck = jest.fn(() => Promise.resolve());
      const { wrapperInstance } = setup({ createDeck: mockCreateDeck });
      jest.spyOn(wrapperInstance, 'setState');

      await wrapperInstance.handleSubmit({}, {});

      expect(
        wrapperInstance.setState
      ).toHaveBeenCalledWith({ progressDialogVisible: true });
    });

    it('waits for 1000 ms and then calls submitCreatedDeck', async () => {
      const mockValues = jest.fn();
      const mockCreateDeck = jest.fn(() => Promise.resolve());
      const { wrapperInstance } = setup({ createDeck: mockCreateDeck });
      jest.spyOn(helpers, 'waitFor');
      jest.spyOn(wrapperInstance, 'submitCreatedDeck');

      await wrapperInstance.handleSubmit(mockValues, {});

      expect(helpers.waitFor).toHaveBeenCalledWith(1000);
      expect(
        wrapperInstance.submitCreatedDeck
      ).toHaveBeenCalledWith(mockValues);
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

  describe('submitCreatedDeck', () => {
    it('calls createDeck with the new values', () => {
      const mockValues = jest.fn();
      const mockCreateDeck = jest.fn(() => Promise.resolve());
      const { wrapperInstance } = setup({ createDeck: mockCreateDeck });

      wrapperInstance.submitCreatedDeck(mockValues);

      expect(mockCreateDeck).toHaveBeenCalledWith(mockValues);
    });

    it('then hides the progressDialog', async () => {
      const mockCreateDeck = jest.fn(() => Promise.resolve());
      const { wrapperInstance } = setup({ createDeck: mockCreateDeck });
      jest.spyOn(wrapperInstance, 'setState');

      await wrapperInstance.submitCreatedDeck();

      expect(
        wrapperInstance.setState
      ).toHaveBeenCalledWith({ progressDialogVisible: false });
    });

    it('then redirects to MainScreen with a flashMessage', async () => {
      const mockNavigate = jest.fn();
      const mockCreateDeck = jest.fn(() => Promise.resolve());
      const { wrapperInstance } = setup({ createDeck: mockCreateDeck });
      wrapperInstance.props.navigation.navigate = mockNavigate;

      await wrapperInstance.submitCreatedDeck();

      expect(mockNavigate).toHaveBeenCalledWith(
        'Main',
        { flashMessage: 'Deck has been successfully created' }
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
