import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Animated } from 'react-native';

class Fadable extends Component {
  state = {
    visible: true,
    opacity: new Animated.Value(1)
  }

  onComplete = () => this.setState(
    { visible: false }, this.props.onAnimationEnd
  );

  componentDidUpdate(prevProps) {
    const { fade } = this.props;

    if (fade && prevProps.fade !== fade) {
      const { opacity } = this.state;

      Animated.timing(
        opacity,
        { toValue: 0, duration: 350, useNativeDriver: true }
      ).start(this.onComplete);
    }
  }

  render() {
    const { opacity, visible } = this.state;
    const { children } = this.props;

    return (
      <Animated.View
        style={{
          opacity: opacity.interpolate({
            inputRange: [0, 1], outputRange: [0, 1]
          })
        }}
      >
        {visible && children}
      </Animated.View>
    );
  }
}

Fadable.propTypes = {
  fade: PropTypes.bool,
  children: PropTypes.node.isRequired,
  onAnimationEnd: PropTypes.func
};

Fadable.defaultProps = {
  fade: false
};

export default Fadable;
