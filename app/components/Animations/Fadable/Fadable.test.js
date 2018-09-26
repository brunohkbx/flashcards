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

  describe('startAnimation', () => {
    it('starts the animation and calls onComplete when it ends', () => {
      const mockAnimatedStart = jest.fn();
      const { wrapperInstance } = setup();
      jest.spyOn(Animated, 'timing')
        .mockImplementation(() => ({ start: mockAnimatedStart }));

      wrapperInstance.startAnimation();

      expect(Animated.timing).toHaveBeenCalledWith(
        wrapperInstance.state.opacity,
        { toValue: 0, duration: 350, useNativeDriver: true  }
      );

      expect(
        mockAnimatedStart
      ).toHaveBeenCalledWith(wrapperInstance.onComplete);
    });
  });

  describe('componentDidUpdate', async () => {
    describe('When component is faded', () => {
      it('starts the animation', () => {
        const { wrapper, wrapperInstance } = setup();
        jest.spyOn(wrapperInstance, 'startAnimation');

        wrapper.setProps({ fade: true });

        expect(wrapperInstance.startAnimation).toHaveBeenCalled();
      });

      it('resets opacity and visible when component was faded and now is not anymore', () => {
        const { wrapper, wrapperInstance } = setup({ fade: true });
        jest.spyOn(wrapperInstance, 'setState');

        wrapper.setProps({ fade: false });

        expect(wrapperInstance.setState).toHaveBeenCalledWith(
          {
            visible: true,
            opacity: new Animated.Value(1)
          }
        );
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
