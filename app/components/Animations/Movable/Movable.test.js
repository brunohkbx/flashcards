import React from 'react';
import { shallow } from 'enzyme';
import { Movable } from './Movable';
import { Animated, View } from 'react-native';
import { theme } from '../../../config/theme';

describe('Movable', () => {
  const setup = propOverrides => {
    const defaultProps = Object.assign({
      toValue: 0,
      theme
    }, propOverrides);

    const wrapper = shallow(<Movable {...defaultProps} ><View /></Movable>);
    const wrapperInstance = wrapper.instance();

    return {
      wrapper, wrapperInstance
    };
  };

  it('renders properly', () => {
    const { wrapper } = setup();

    expect(wrapper).toMatchSnapshot();
  });

  describe('animatedStyle', () => {
    it('performs a enteringScreen animation when toValue is less than 0', () => {
      const { wrapperInstance } = setup({ toValue: -46 });
      const { transitions: { duration, easing }} = theme;

      expect(wrapperInstance.animatedStyle()).toEqual(
        {
          toValue: -46,
          duration: duration.enteringScreen,
          easing: easing.easeOut,
          useNativeDriver: true
        }
      );
    });

    it('performs a leavingScreen animation when toValue is greater or equal to 0', () => {
      const { wrapperInstance } = setup({ toValue: 0 });
      const { transitions: { duration, easing }} = theme;

      expect(wrapperInstance.animatedStyle()).toEqual(
        {
          toValue: 0,
          duration: duration.leavingScreen,
          easing: easing.sharp,
          useNativeDriver: true
        }
      );
    });
  });

  describe('animate', () => {
    it('starts the animation', () => {
      const { wrapperInstance } = setup();
      jest.spyOn(Animated, 'timing');

      wrapperInstance.animate();

      expect(Animated.timing).toHaveBeenCalledWith(
        wrapperInstance.state.translateY,
        wrapperInstance.animatedStyle()
      );
    });
  });

  describe('componentDidUpdate', () => {
    it('calls animate again if there is a new value for toValue', () => {
      const { wrapper, wrapperInstance } = setup();
      jest.spyOn(wrapperInstance, 'animate');

      wrapper.setProps({ toValue: 50 });

      expect(wrapperInstance.animate).toHaveBeenCalled();
    });

    it('does not call animate if there is not a new value for toValue', () => {
      const { wrapper, wrapperInstance } = setup();
      jest.spyOn(wrapperInstance, 'animate');

      wrapper.setProps({ toValue: 0 });

      expect(wrapperInstance.animate).not.toHaveBeenCalled();
    });
  });
});
