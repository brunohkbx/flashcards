import React from 'react';
import { shallow } from 'enzyme';
import Result from './Result';
import * as notificationUtil from '../../../lib/notifications';

describe('Result', () => {
  const setup = propOverrides => {
    const defaultProps = Object.assign({
      score: 3,
      totalQuestions: 10,
      onRestartQuiz: jest.fn()
    }, propOverrides);

    const wrapper = shallow(<Result {...defaultProps} />);
    const wrapperInstance = wrapper.instance();

    return { wrapper, wrapperInstance };
  };

  it('renders properly', () => {
    const { wrapper } = setup();

    expect(wrapper).toMatchSnapshot();
  });

  describe('scheduleNotification', () => {
    it('calls clearLocalNotification and then scheduleLocalNotification', async () => {
      const { wrapperInstance } = setup();
      jest.spyOn(notificationUtil, 'clearLocalNotification');
      jest.spyOn(notificationUtil, 'scheduleLocalNotification');

      await wrapperInstance.scheduleNotification();

      expect(notificationUtil.scheduleLocalNotification).toHaveBeenCalled();
      expect(notificationUtil.clearLocalNotification).toHaveBeenCalled();
    });
  });

  describe('componentDidMount', () => {
    describe('When receiveNotifications is enabled', () => {
      it('calls scheduleNotification', () => {
        const { wrapperInstance } = setup({ receiveNotifications: true });
        jest.spyOn(wrapperInstance, 'scheduleNotification');

        wrapperInstance.componentDidMount();

        expect(wrapperInstance.scheduleNotification).toHaveBeenCalled();
      });
    });
  });
});
