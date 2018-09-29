import React from 'react';
import { shallow } from 'enzyme';
import FlashcardCollapsed from '../FlashcardCollapsed';

describe('FlashcardCollapsed', () => {
  const setup = propOverrides => {
    const defaultProps = Object.assign({
      currentQuestion: 1,
      totalQuestions: 20,
      flashcard: {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      }
    }, propOverrides);

    const wrapper = shallow(<FlashcardCollapsed {...defaultProps} />);
    const wrapperInstance = wrapper.instance();

    return { wrapper, wrapperInstance };
  }

  it('renders properly', () => {
    const { wrapper } = setup();

    expect(wrapper).toMatchSnapshot();
  });

  it('displays answer when flashcard is not collapsed', () => {
    const { wrapper } = setup();

    wrapper.setState({ collapsed: true });

    expect(wrapper).toMatchSnapshot();
  });

  describe('toggleCollapsedState', () => {
    it('toggles the collapsed state', () => {
      const { wrapperInstance } = setup();
      wrapperInstance.setState({ collapsed: true });

      wrapperInstance.toggleCollapsedState();

      expect(wrapperInstance.state.collapsed).toBeFalsy();
    });
  });
});
