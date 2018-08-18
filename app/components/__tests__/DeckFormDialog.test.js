import React from 'react';
import { shallow } from 'enzyme';
import { DeckFormDialog, Form } from '../DeckFormDialog';

describe('Dumb DeckFormDialog', () => {
  const setup = propOverrides => {
    const defaultProps = Object.assign({
      visible: true,
      handleDismiss: jest.fn(),
      handleSubmit: jest.fn(),
      handleChange: jest.fn(() => jest.fn),
      handleBlur: jest.fn(() => jest.fn),
      touched: {},
      errors: {},
      values: {}
    }, propOverrides)

    const wrapper = shallow(<DeckFormDialog {...defaultProps} />);

    const cancel = () => {
      wrapper
        .find('DialogActions')
        .childAt(0)
        .simulate('press')
    }

    const submit = () => {
      wrapper
        .find('DialogActions')
        .childAt(1)
        .simulate('press')
    }

    const dismiss = () => {
      wrapper.simulate('dismiss');
    }

    return {
      defaultProps,
      wrapper,
      cancel,
      submit,
      dismiss
    }
  }

  it('renders properly', () => {
    const { wrapper } = setup();

    expect(wrapper).toMatchSnapshot();
  });

  test('onDismiss calls handleDismiss', () => {
    const mockHandleDismiss = jest.fn();
    const { dismiss } = setup({ handleDismiss: mockHandleDismiss });

    dismiss();

    expect(mockHandleDismiss).toHaveBeenCalled();
  });

  describe('Cancel button', () => {
    it('calls handleDismiss', () => {
      const mockHandleDismiss = jest.fn();
      const { cancel } = setup({ handleDismiss: mockHandleDismiss });

      cancel();

      expect(mockHandleDismiss).toHaveBeenCalled();
    });
  });

  describe('Submit button', () => {
    it('calls handleSubmit', () => {
      const mockHandleSubmit = jest.fn();
      const { submit } = setup({ handleSubmit: mockHandleSubmit });

      submit();

      expect(mockHandleSubmit).toHaveBeenCalled();
    });

    it('displays an error message if input is invalid', () => {
      const { wrapper } = setup({
        touched: { title: true },
        errors: { title: 'Required' }
      });

      expect(wrapper).toMatchSnapshot();
    });
  });
});

describe('DeckFormDialog enhanced with Formik ', () => {
  const setup = propOverrides => {
    const defaultProps = Object.assign({
      visible: true,
      handleDismiss: jest.fn(),
      handleSubmit: jest.fn(),
      createDeck: jest.fn(),
    }, propOverrides)

    const wrapper = shallow(<Form {...defaultProps} />);

    const submit = () => {
      wrapper.simulate(
        'submit',
        {},
        Object.assign({ resetForm: jest.fn() }, propOverrides)
      )
    }

    const dismiss = () => {
      wrapper
        .dive()
        .find('DeckFormDialog')
        .shallow()
        .simulate('dismiss')
    }

    return {
      defaultProps,
      wrapper,
      submit,
      dismiss
    }
  }

  describe('Cancel button ', () => {
    it('dismisses the form', () => {
      const mockHandleDismiss = jest.fn();
      const { dismiss } = setup({ handleDismiss: mockHandleDismiss });

      dismiss();

      expect(mockHandleDismiss).toHaveBeenCalled();
    });
  });

  describe('Submit button', () => {
    it('submits the form', () => {
      const mockHandleSubmit = jest.fn();
      const { submit } = setup({ handleSubmit: mockHandleSubmit });

      submit();

      expect(mockHandleSubmit).toHaveBeenCalled();
    });
  });
});
