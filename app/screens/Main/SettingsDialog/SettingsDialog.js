import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import {
  Dialog,
  HelperText,
  Paragraph,
  Portal,
  Switch
} from 'react-native-paper';
import { obtainNotificationPermission } from '../../../lib/permissionsUtil';
import { updateSettings } from '../../../actions';

export class SettingsDialog extends Component {
  state = {
    error: false
  }

  onNotificationsChange = async () => {
    const { updateSettings, settings: { receiveNotifications } } = this.props;

    const status = await obtainNotificationPermission();

    if (status !== 'granted')
      return this.setState({ error: true });

    updateSettings({ receiveNotifications: !receiveNotifications })
      .then(() => this.setState(
        {
          enableNotifications: !receiveNotifications,
          error: false
        }
      )
    );
  }

  render() {
    const {
      visible,
      settings: { receiveNotifications },
      onDismiss
    } = this.props;

    const { error } = this.state;

    return (
      <Portal>
        <Dialog visible={visible} onDismiss={onDismiss}>
          <Dialog.Title>Settings</Dialog.Title>
          <Dialog.Content>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <Paragraph>Notifications</Paragraph>
              <Switch
                value={receiveNotifications}
                onValueChange={this.onNotificationsChange}
              />
            </View>
            {error &&
              <HelperText
                type="error"
                style={{ paddingHorizontal: 0 }}
              >
                You need to grant NOTIFICATIONS permission
              </HelperText>
            }
          </Dialog.Content>
        </Dialog>
      </Portal>
    );
  }
}

SettingsDialog.propTypes = {
  visible: PropTypes.bool,
  onDismiss: PropTypes.func.isRequired
};

SettingsDialog.defaultProps = {
  visible: false
};

const mapStateToProps = ({ settings }) => ({ settings });

const mapDispatchToProps = dispatch => ({
  updateSettings: settings => dispatch(updateSettings(settings)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsDialog);
