import React from 'react';
import { shallow } from 'enzyme';
import ConfirmDialog from '../ConfirmDialog';

describe('ConfirmDialog', () => {
  const setup = propOverrides => {
    const defaultProps = Object.assign({
      handleDismiss: jest.fn(),
      handleSubmitPress: jest.fn(),
      actionSubmitText: 'Submit'
    }, propOverrides);

    const wrapper = shallow(<ConfirmDialog {...defaultProps} />);

    const cancel = () => {
      wrapper
        .find('DialogActions')
        .childAt(0)
        .simulate('press');
    };

    const dismiss = () => {
      wrapper.simulate('dismiss');
    };

    const submit = () => {
      wrapper
        .find('DialogActions')
        .childAt(1)
        .simulate('press');
    };

    return {
      defaultProps,
      wrapper,
      cancel,
      dismiss,
      submit
    };
  };

  it('renders properly', () => {
    const { wrapper } =  setup();

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
    it('calls handleSubmitPress', () => {
      const mockHandleSubmitPress = jest.fn();
      const { submit } = setup({ handleSubmitPress: mockHandleSubmitPress });

      submit();

      expect(mockHandleSubmitPress).toHaveBeenCalled();
    });
  });
});
