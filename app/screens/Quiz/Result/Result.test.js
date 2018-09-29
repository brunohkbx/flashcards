import React from 'react';
import { shallow } from 'enzyme';
import Result from './Result';

describe('Result', () => {
  const setup = propOverrides => {
    const defaultProps = Object.assign({
      score: 3,
      totalQuestions: 10,
      onRestartQuiz: jest.fn()
    }, propOverrides);

    const wrapper = shallow(<Result {...defaultProps} />);

    return { wrapper };
  };

  it('renders properly', () => {
    const { wrapper } = setup();

    expect(wrapper).toMatchSnapshot();
  });
});
