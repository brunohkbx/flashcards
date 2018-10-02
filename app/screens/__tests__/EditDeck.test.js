import React from 'react';
import { shallow } from 'enzyme';
import { EditDeck } from '../EditDeck';
import * as helpers from '../../lib/helpers';

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
    it('displays the progressDialog', async () => {
      const mockEditDeck = jest.fn(() => Promise.resolve());
      const { wrapperInstance } = setup({ editDeck: mockEditDeck });
      jest.spyOn(wrapperInstance, 'setState');

      await wrapperInstance.handleSubmit({}, {});

      expect(
        wrapperInstance.setState
      ).toHaveBeenCalledWith({ progressDialogVisible: true });
    });

    it('waits for 1000 ms and then calls submitEditedDeck', async () => {
      const mockValues = jest.fn();
      const mockEditDeck = jest.fn(() => Promise.resolve());
      const { wrapperInstance } = setup({ editDeck: mockEditDeck });
      jest.spyOn(helpers, 'waitFor');
      jest.spyOn(wrapperInstance, 'submitEditedDeck');

      await wrapperInstance.handleSubmit(mockValues, {});

      expect(helpers.waitFor).toHaveBeenCalledWith(1000);
      expect(wrapperInstance.submitEditedDeck).toHaveBeenCalledWith(mockValues);
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

  describe('submitEditedDeck', () => {
    it('calls editDeck with the new values', () => {
      const mockValues = jest.fn();
      const mockEditDeck = jest.fn(() => Promise.resolve());
      const { wrapperInstance } = setup({ editDeck: mockEditDeck });

      wrapperInstance.submitEditedDeck(mockValues);

      expect(mockEditDeck).toHaveBeenCalledWith(mockValues);
    });

    it('then hides the progressDialog', async () => {
      const mockEditDeck = jest.fn(() => Promise.resolve());
      const { wrapperInstance } = setup({ editDeck: mockEditDeck });
      jest.spyOn(wrapperInstance, 'setState');

      await wrapperInstance.submitEditedDeck();

      expect(
        wrapperInstance.setState
      ).toHaveBeenCalledWith({ progressDialogVisible: false });
    });

    it('then redirects to MainScreen with a flashMessage', async () => {
      const mockNavigate = jest.fn();
      const mockEditDeck = jest.fn(() => Promise.resolve());
      const { wrapperInstance } = setup({ editDeck: mockEditDeck });
      wrapperInstance.props.navigation.navigate = mockNavigate;

      await wrapperInstance.submitEditedDeck();

      expect(mockNavigate).toHaveBeenCalledWith(
        'Main',
        { flashMessage: 'Deck has been successfully edited' }
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
