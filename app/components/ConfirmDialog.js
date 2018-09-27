import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Dialog,
  Paragraph
} from 'react-native-paper';

export const ConfirmDialog = props => {
  const {
    visible,
    handleDismiss,
    handleSubmitPress,
    title,
    content,
    actionCancelText,
    actionSubmitText
  } = props;

  return (
    <Dialog
      visible={visible}
      onDismiss={handleDismiss}
    >
      <Dialog.Title>{title}</Dialog.Title>
      <Dialog.Content>
        <Paragraph>{content}</Paragraph>
      </Dialog.Content>
      <Dialog.Actions>
        <Button primary onPress={handleDismiss}>{actionCancelText}</Button>
        <Button primary onPress={handleSubmitPress}>{actionSubmitText}</Button>
      </Dialog.Actions>
    </Dialog>
  );
};

ConfirmDialog.propTypes = {
  visible: PropTypes.bool,
  handleDismiss: PropTypes.func.isRequired,
  handleSubmitPress: PropTypes.func.isRequired,
  actionSubmitText: PropTypes.string.isRequired
};

ConfirmDialog.defaultProps = {
  visible: false,
  actionCancelText: 'cancel'
};

export default ConfirmDialog;
