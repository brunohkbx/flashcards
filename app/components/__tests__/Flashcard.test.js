import React from 'react';
import { shallow } from 'enzyme';
import Flashcard from '../Flashcard';

describe('Flashcard', () => {
  const setup = propOverrides => {
    const defaultProps = Object.assign({
      onFlashcardDeleted: jest.fn()
    }, propOverrides);

    const wrapper = shallow(<Flashcard {...defaultProps} />);

    const deleteFlashcard = () => {
      wrapper.find('withTheme(IconButton)').simulate('press');
    };

    return { wrapper, deleteFlashcard };
  };

  it('renders properly', () => {
    const { wrapper } = setup();

    expect(wrapper).toMatchSnapshot();
  });

  it('does not render an action when onFlashcardDeleted is null', () => {
    const { wrapper } = setup({ onFlashcardDeleted: null });

    expect(wrapper).toMatchSnapshot();
  });

  test('DeleteIcon onPress calls onFlashcardDeleted', () => {
    const mockOnFlashcardDeleted = jest.fn();
    const { deleteFlashcard } = setup({ onFlashcardDeleted: mockOnFlashcardDeleted });

    deleteFlashcard();

    expect(mockOnFlashcardDeleted).toHaveBeenCalled();
  });
});
