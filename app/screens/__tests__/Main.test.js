import React from 'react';
import { shallow } from 'enzyme';
import { Main } from '../Main';

const setup = () => {
  const defaultProps = {
    decks: [
      {
        title: 'React',
        questions: [
          {
            question: 'What is React?',
            answer: 'A library for managing user interfaces'
          }
        ]
      }
    ]
  }

  const wrapper = shallow(<Main {...defaultProps} />);

  return {
    defaultProps,
    wrapper
  }
}

describe('Main', () => {
  it('renders properly', () => {
    const { wrapper } = setup();

    expect(wrapper).toMatchSnapshot();
  })
});
