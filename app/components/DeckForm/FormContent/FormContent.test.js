import React from 'react';
import { shallow } from 'enzyme';
import FormContent from './FormContent';

describe('FormContent', () => {
  const setup = propOverrides => {
    const defaultProps = Object.assign({
      handleChange: jest.fn(),
      values: {
        title: 'React',
        questions: [{
          question: 'What is React?',
          answer: 'A library for managing user interfaces',
          id: '1'
        }],
        id: '1'
      },
      onFlashcardDeleted: jest.fn()
    }, propOverrides);

    const wrapper = shallow(<FormContent {...defaultProps} />);

    const contentSizeChange = () => {
      wrapper.find('ScrollView').simulate('contentSizeChange');
    };

    return {
      wrapper,
      contentSizeChange
    };
  };

  it('renders properly', () => {
    const { wrapper } =  setup();

    expect(wrapper).toMatchSnapshot();
  });
});
