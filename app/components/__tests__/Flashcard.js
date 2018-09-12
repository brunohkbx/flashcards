import React from 'react';
import { shallow } from 'enzyme';
import Flashcard from '../Flashcard';

describe('Flashcard', () => {
  const setup = propOverrides => {
    const defaultProps = Object.assign({
      onFlashcardDeleted: jest.fn()
    }, propOverrides);

    const wrapper = shallow(<Flashcard {...defaultProps} />);

    const deleteFlashcard = () => wrapper.find('DeleteIcon').simulate('press');

    return { wrapper, deleteFlashcard };
  }

  it('renders properly', () => {
    const { wrapper } = setup();

    expect(wrapper).toMatchSnapshot();
  });

  test('DeleteIcon onPress calls onFlashcardDeleted', () => {
    const mockOnFlashcardDeleted = jest.fn();
    const { deleteFlashcard } = setup({ onFlashcardDeleted: mockOnFlashcardDeleted });

    deleteFlashcard();

    expect(mockOnFlashcardDeleted).toHaveBeenCalled();
  });
});
