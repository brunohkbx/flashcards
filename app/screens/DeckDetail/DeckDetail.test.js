import React from 'react';
import { shallow } from 'enzyme';
import { DeckDetail } from './DeckDetail';

describe('DeckDetail', () => {
  const setup = propOverrides => {
    const defaultProps = Object.assign({
      navigation: {
        setParams: jest.fn()
      },
      deck: { questions: [] }
    }, propOverrides);

    const wrapper = shallow(<DeckDetail {...defaultProps} />);
    const wrapperInstance = wrapper.instance();

    const pressOnEditButton = () => {
      wrapper
        .find('NoContent')
        .dive()
        .find('withTheme(Button)')
        .simulate('press');
    };

    return { wrapper, wrapperInstance, pressOnEditButton };
  };

  it('renders properly when deck has questions', () => {
    const { wrapper } = setup({
      deck: {
        questions: [
          {
            question: 'What is React?',
            answer: 'A library for managing user interfaces'
          }
        ]
      }
    });

    expect(wrapper).toMatchSnapshot();
  });

  it('renders properly when deck does not have questions', () => {
    const { wrapper } = setup({ deck: { questions: [] }});

    expect(wrapper).toMatchSnapshot();
  });

  describe('renderItem', () => {
    it('renders properly', () => {
      const { wrapperInstance } = setup();

      expect(
        wrapperInstance.renderItem(
          {
            item: {
              question: 'What is React?',
              answer: 'A library for managing user interfaces'
            }
          }
        )
      ).toMatchSnapshot();
    });
  });

  describe('componentDidMount', () => {
    it('sets openDialog and quizDisabled as navigation params', () => {
      const mockNavigation = { setParams: jest.fn() };
      const { wrapperInstance } = setup({ navigation: mockNavigation });

      expect(mockNavigation.setParams).toHaveBeenCalledWith(
        {
          openDialog: wrapperInstance.openDialog,
          quizDisabled: wrapperInstance.props.deck.questions.length === 0
        }
      );
    });
  });

  test('EditButton of NoContent screen navigates to Edit screen', () => {
    const mockNavigation = { navigate: jest.fn(), setParams: jest.fn() };
    const { pressOnEditButton } = setup(
      {
        deck: { id: '1', questions: [] },
        navigation: mockNavigation
      }
    );

    pressOnEditButton();

    expect(mockNavigation.navigate).toHaveBeenCalledWith(
      'EditDeck',
      { deckId: '1' }
    );
  });
});
