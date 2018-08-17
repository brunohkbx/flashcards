import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
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
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Paragraph>{content}</Paragraph>
      </DialogContent>
      <DialogActions>
        <Button primary onPress={handleDismiss}>{actionCancelText}</Button>
        <Button primary onPress={handleSubmitPress}>{actionSubmitText}</Button>
      </DialogActions>
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
