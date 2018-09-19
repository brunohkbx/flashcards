import React from 'react';
import { shallow } from 'enzyme';
import { Colors } from 'react-native-paper';
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

    return { wrapper, wrapperInstance };
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

  describe('renderIcon', () => {
    it('renders properly', () => {
      const { wrapperInstance } = setup();

      expect(
        wrapperInstance.renderIcon({ size: 24, color: Colors.white })
      ).toMatchSnapshot();
    });
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
    it('sets this.openDialog as navigation params', () => {
      const mockNavigation = { setParams: jest.fn() };
      const { wrapperInstance } = setup({ navigation: mockNavigation });

      expect(
        mockNavigation.setParams
      ).toHaveBeenCalledWith({ openDialog: wrapperInstance.openDialog});
    });
  });
});
