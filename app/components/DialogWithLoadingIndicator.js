import React from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator, View } from 'react-native';
import { Paragraph, Portal, Dialog } from 'react-native-paper';
import { getOS } from '../lib/helpers';

const DialogWithLoadingIndicator = ({ visible, loadingMessage }) => {
  return (
    <Portal>
      <Dialog visible={visible} dismissable={false} >
        <Dialog.Content>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <ActivityIndicator
              size={getOS() === 'ios' ? 'large' : 48}
              style={{ marginRight: 16 }}
            />
            <Paragraph>{loadingMessage}</Paragraph>
          </View>
        </Dialog.Content>
      </Dialog>
    </Portal>
  );
};

DialogWithLoadingIndicator.propTypes = {
  visible: PropTypes.bool,
  loadingMessage: PropTypes.string
};

DialogWithLoadingIndicator.defaultProps = {
  visible: false,
  loadingMessage: ''
};

export default DialogWithLoadingIndicator;
