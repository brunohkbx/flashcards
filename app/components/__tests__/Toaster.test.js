import React from 'react';
import { shallow } from 'enzyme';
import Toaster from '../Toaster';
import * as helpers from '../../lib/helpers';

describe('Toaster', () => {
  const setup = propOverrides => {
    const defaultProps = Object.assign({
    }, propOverrides)

    const wrapper = shallow(<Toaster {...defaultProps} />);
    const wrapperInstance = wrapper.instance();

    const dismissSnackbar = () => {
      wrapper.find('withTheme(Snackbar)').simulate('dismiss');
    };

    return { wrapper, wrapperInstance, dismissSnackbar }
  };

  it('renders properly', () => {
    const { wrapper } = setup();

    expect(wrapper).toMatchSnapshot();
  });

  describe('showMessage', () => {
    it('pushes a new message to the queue', () => {
      const mockQueue = {push: jest.fn()};
      const {wrapperInstance} = setup();
      wrapperInstance.queue = mockQueue;

      wrapperInstance.showMessage('foo');

      expect(mockQueue.push).toHaveBeenCalledWith('foo');
    });

    describe('When visible', () => {
      it('hides the snackbar and calls processQueueAfterAnimation', () => {
        const {wrapperInstance} = setup();
        jest.spyOn(wrapperInstance, 'processQueue');
        jest.spyOn(wrapperInstance, 'setState');
        wrapperInstance.setState({ visible: true });

        wrapperInstance.showMessage('foo');

        expect(wrapperInstance.setState).toHaveBeenCalledWith(
          { visible: false },
          wrapperInstance.processQueueAfterAnimation
        );
      });
    });

    describe('When it is not visible', () => {
      it('calls processQueue', () => {
        const { wrapperInstance } = setup();
        jest.spyOn(wrapperInstance, 'processQueue');
        wrapperInstance.setState({ visible: false });

        wrapperInstance.showMessage('foo');

        expect(wrapperInstance.processQueue).toHaveBeenCalled();
      });
    });
  })

  describe('processQueue', () => {
    describe('When queue has length greather than 0', () => {
      it('displays the snackbar with the first item of the queue', () => {
        const { wrapperInstance } = setup();
        jest.spyOn(wrapperInstance, 'setState');
        wrapperInstance.queue = ['foo'];

        wrapperInstance.processQueue();

        expect(wrapperInstance.setState).toHaveBeenCalledWith(
          {
            message: 'foo',
            visible: true
          }
        )
      });
    });
  });

  describe('processQueueAfterAnimation', () => {
    it('calls processQueue after HIDE_ANIMATION_DURATION', () => {
      const { wrapperInstance } = setup();
      jest.spyOn(helpers, 'waitFor');
      jest.spyOn(wrapperInstance, 'processQueue');

      wrapperInstance.processQueueAfterAnimation().then(() => {
        expect(helpers.waitFor).toHaveBeenCalledWith(
          wrapperInstance.HIDE_ANIMATION_DURATION
        )
        expect(wrapperInstance.processQueue).toHaveBeenCalled();
      })
    });
  });

  describe('handleDismiss', () => {
    it('hides the snackbar and calls the given callback', () => {
      const { wrapperInstance } = setup();
      jest.spyOn(wrapperInstance, 'setState');

      wrapperInstance.handleDismiss();

      expect(wrapperInstance.setState).toHaveBeenCalledWith(
        { visible: false},
        wrapperInstance.props.onDismissCallback
      )
    });
  });
});
