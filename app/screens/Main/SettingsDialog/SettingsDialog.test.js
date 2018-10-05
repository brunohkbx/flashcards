import React from 'react';
import { shallow } from 'enzyme';
import { SettingsDialog } from './SettingsDialog';
import * as permissionsUtil from '../../../lib/permissionsUtil';

describe('SettingsDialog', () => {
  const setup = propOverrides => {
    const defaultProps = Object.assign({
      onDismiss: jest.fn(),
      settings: {
        receiveNotifications: false
      }
    }, propOverrides);

    const wrapper = shallow(<SettingsDialog {...defaultProps} />);
    const wrapperInstance = wrapper.instance();

    return { wrapper, wrapperInstance };
  };

  it('renders properly', () => {
    const { wrapper } = setup();

    expect(wrapper).toMatchSnapshot();
  });

  it('renders properly when notification permission is not granted', () => {
    const { wrapper } = setup();

    wrapper.setState({ error: true });

    expect(wrapper).toMatchSnapshot();
  });

  describe('onNotificationsChange', () => {
    it('displays an error message when notification permission is not granted', async () => {
      const { wrapperInstance } = setup();
      jest.spyOn(permissionsUtil, 'obtainNotificationPermission').mockImplementation(() => {
        return false;
      });
      jest.spyOn(wrapperInstance, 'setState');

      await wrapperInstance.onNotificationsChange();

      expect(wrapperInstance.setState).toHaveBeenCalledWith({ error: true });
    });

    it('calls updateSettings and toggle enableNotifications in the store', async () => {
      const mockUpdateSettings = jest.fn(() => Promise.resolve());
      const { wrapperInstance } = setup({ updateSettings: mockUpdateSettings });
      jest.spyOn(permissionsUtil, 'obtainNotificationPermission').mockImplementation(() => {
        return 'granted';
      });
      jest.spyOn(wrapperInstance, 'setState');

      await wrapperInstance.onNotificationsChange();

      expect(mockUpdateSettings).toHaveBeenCalledWith(
        { receiveNotifications: !wrapperInstance.props.receiveNotifications }
      );
      expect(wrapperInstance.setState).toHaveBeenCalledWith(
        {
          enableNotifications: !wrapperInstance.props.receiveNotifications,
          error: false
        }
      );
    });
  });
});
