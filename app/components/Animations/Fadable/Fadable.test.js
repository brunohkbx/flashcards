import React from 'react';
import { shallow } from 'enzyme';
import Fadable from './Fadable';
import { Animated, View } from 'react-native';

describe('Fadable', () => {
  const setup = propOverrides => {
    const defaultProps = Object.assign({
      fade: false,
      onAnimationEnd: () => jest.fn()
    }, propOverrides);

    const wrapper = shallow(<Fadable {...defaultProps} ><View /></Fadable>);
    const wrapperInstance = wrapper.instance();

    return {
      wrapper, wrapperInstance
    };
  };

  beforeEach(() => {
    jest.restoreAllMocks()
  });

  it('renders properly', () => {
    const { wrapper } = setup();

    expect(wrapper).toMatchSnapshot();
  });

  describe('onComplete', () => {
    it('sets visible to false and passes onAnimationEnd as callback to setState', () => {
      const { wrapperInstance } = setup();
      jest.spyOn(wrapperInstance, 'setState');

      wrapperInstance.onComplete();

      expect(wrapperInstance.setState).toHaveBeenCalledWith(
        { visible: false }, wrapperInstance.props.onAnimationEnd
      );
    });
  });

  describe('componentDidUpdate', async () => {
    describe('When component is faded', () => {
      it('starts the animation', () => {
        const { wrapper, wrapperInstance } = setup();
        jest.spyOn(Animated, 'timing');

        wrapper.setProps({ fade: true });

        expect(Animated.timing).toHaveBeenCalledWith(
          wrapperInstance.state.opacity,
          { toValue: 0, duration: 350, useNativeDriver: true  }
        );
      });

      it('calls onComplete when animation ends', () => {
        const { wrapper, wrapperInstance } = setup();
        const mockAnimatedStart = jest.fn();
        jest.spyOn(Animated, 'timing')
          .mockImplementation(() => ({ start: mockAnimatedStart }));

        wrapper.setProps({ fade: true });

        expect(
          mockAnimatedStart
        ).toHaveBeenCalledWith(wrapperInstance.onComplete);
      });
    });

    describe('When component is not faded', () => {
      it('does not start the animation', () => {
        const { wrapper } = setup();
        jest.spyOn(Animated, 'timing');

        wrapper.setProps({ fade: false });

        expect(Animated.timing).not.toHaveBeenCalled();
      });
    });
  });
});
