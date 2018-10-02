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
    const wrapperInstance = wrapper.instance();

    const contentSizeChange = () => {
      wrapper.find('ScrollView').simulate('contentSizeChange');
    };

    return {
      wrapper,
      wrapperInstance,
      contentSizeChange
    };
  };

  it('renders properly', () => {
    const { wrapper } =  setup();

    expect(wrapper).toMatchSnapshot();
  });

  it('renders properly when values are dirty', () => {
    const { wrapper } = setup({ dirty: true });

    expect(wrapper).toMatchSnapshot();
  });

  describe('deleteFlashcard', () => {
    it('sets flashcardToRemove to null and calls onFlashcardDeleted as callback', () => {
      const mockOnFlashcardDeleted = jest.fn();
      const { wrapperInstance } = setup({ onFlashcardDeleted: mockOnFlashcardDeleted });
      jest.spyOn(wrapperInstance, 'setState');

      wrapperInstance.deleteFlashcard('1');

      expect(wrapperInstance.setState).toHaveBeenCalledWith(
        { flashcardToRemove: null }, expect.any(Function)
      );
      expect(mockOnFlashcardDeleted).toHaveBeenCalled();
    });
  });
});
