import React from 'react';
import { shallow } from 'enzyme';
import { Quiz } from './Quiz';

describe('Quiz', () => {
  const setup = propOverrides => {
    const defaultProps = Object.assign({
      deck: {
        title: 'React',
        questions: [
          {
            question: 'What is React?',
            answer: 'A library for managing user interfaces'
          }
        ]
      },
      settings: {
        receiveNotifications: false
      }
    }, propOverrides);

    const wrapper = shallow(<Quiz {...defaultProps} />);
    const wrapperInstance = wrapper.instance();

    return { wrapper, wrapperInstance };
  };

  it('renders properly when the quiz is not over yet', () => {
    const { wrapper } = setup();

    expect(wrapper).toMatchSnapshot();
  });

  it('renders properly when the quiz has ended', () => {
    const { wrapper } = setup();

    wrapper.setState({ currentQuestion: 2, correct: 1 });

    expect(wrapper).toMatchSnapshot();
  });

  describe('scorePositive', () => {
    it('returns undefined when component is fading', () => {
      const { wrapperInstance } = setup();

      wrapperInstance.setState({ fade: true});

      expect(wrapperInstance.scorePositive()).toBeUndefined();
    });

    it('increments the number of correct answer and fade the element', () => {
      const { wrapper, wrapperInstance } = setup();
      const prevState = wrapper.state();

      wrapperInstance.scorePositive();

      expect(wrapper.state()).toMatchObject(
        { correct: prevState.correct + 1, fade: true }
      );
    });
  });

  describe('scoreNegative', () => {
    it('returns undefined when component is fading', () => {
      const { wrapperInstance } = setup();

      wrapperInstance.setState({ fade: true});

      expect(wrapperInstance.scoreNegative()).toBeUndefined();
    });

    it('increments the number of incorrect answer and fade the element', () => {
      const { wrapper, wrapperInstance } = setup();
      const prevState = wrapper.state();

      wrapperInstance.scoreNegative();

      expect(wrapper.state()).toMatchObject(
        { incorrect: prevState.incorrect + 1, fade: true }
      );
    });
  });

  describe('renderNextFlashcard', () => {
    it('increments the currentQuestion and unfade the element', () => {
      const { wrapper, wrapperInstance } = setup();
      const prevState = wrapper.state();

      wrapperInstance.renderNextFlashcard();

      expect(wrapper.state()).toMatchObject(
        { currentQuestion: prevState.currentQuestion + 1, fade: false }
      );
    });
  });

  describe('handleRestartQuiz', () => {
    it('resets the state', () => {
      const { wrapper, wrapperInstance } = setup();

      wrapperInstance.handleRestartQuiz();

      expect(wrapper.state()).toMatchObject(
        { currentQuestion: 1, correct: 0, incorrect: 0, fade: false }
      );
    });
  });

  describe('totalQuestions', () => {
    it('returns the amount of questions from the deck', () => {
      const { wrapperInstance } = setup();
      const totalQuestions = wrapperInstance.props.deck.questions.length;

      expect(wrapperInstance.totalQuestions).toEqual(totalQuestions);
    });
  });

  describe('isFinished', () => {
    it('checks if currentQuestion - 1 is equal to totalQuestions', () => {
      const { wrapperInstance } = setup();
      wrapperInstance.setState({ currentQuestion: 4 });
      wrapperInstance.totalQuestions = 3;

      expect(wrapperInstance.isFinished()).toBeTruthy();
    });
  });
});
