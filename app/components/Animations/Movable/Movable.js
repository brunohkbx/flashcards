import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Animated } from 'react-native';
import { withTheme } from 'react-native-paper';

export class Movable extends Component {
  state = {
    translateY: new Animated.Value(0)
  };

  animatedStyle = () => {
    const {
      toValue,
      theme: { transitions: { duration, easing }}
    } = this.props;

    return {
      toValue,
      duration: toValue < 0 ? duration.enteringScreen : duration.leavingScreen,
      easing: toValue < 0 ? easing.easeOut : easing.sharp,
      useNativeDriver: true
    };
  };

  animate = () => {
    const { translateY } = this.state;

    Animated.timing(translateY, this.animatedStyle()).start();
  }

  componentDidMount = () => {
    this.animate();
  }

  componentDidUpdate(prevProps) {
    if (this.props.toValue !== prevProps.toValue)
      this.animate();
  }

  render() {
    const { children, style } = this.props;
    const { translateY } = this.state;

    return (
      <Animated.View style={{ transform: [{ translateY }] }} >
        {children}
      </Animated.View>
    );
  }
}

Movable.propTypes = {
  toValue: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired
};

export default withTheme(Movable);
