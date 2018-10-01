import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Snackbar } from 'react-native-paper';
import { waitFor } from '../lib/helpers';

class Toaster extends Component {
  HIDE_ANIMATION_DURATION = 150
  queue = []

  state = {
    visible: false,
    message: ''
  }

  showMessage = message => {
    this.queue.push(message);

    if (this.state.visible) {
      this.setState(
        { visible: false },
        this.processQueueAfterAnimation
      );
    }
    else
      this.processQueue();
  };

  processQueue = () => {
    const { queue } = this;

    if (queue.length > 0) {
      this.setState({
        message: queue.shift(),
        visible: true,
      });
    }
  };

  processQueueAfterAnimation = () => {
    return waitFor(this.HIDE_ANIMATION_DURATION).then(this.processQueue);
  };

  handleDismiss = () => {
    const { onDismissCallback } = this.props;

    this.setState({ visible: false }, onDismissCallback);
  }

  render() {
    const { visible, message } = this.state;

    return (
      <Snackbar
        visible={visible}
        onDismiss={this.handleDismiss}
      >
        {message}
      </Snackbar>
    );
  }
}

Toaster.propTypes = {
  onDismissCallback: PropTypes.func,
  icon: PropTypes.string
};

export default Toaster;

