import React from 'react';
import { shallow } from 'enzyme';
import { FormikDeckForm, DeckForm } from './DeckForm';

describe('FormikDeckForm', () => {
  const setup = propOverrides => {
    const defaultProps = Object.assign({
      handleSubmit: jest.fn(),
    }, propOverrides);

    const wrapper = shallow(<FormikDeckForm {...defaultProps} />);

    const submit = () => wrapper.simulate('submit');

    return {
      wrapper,
      submit
    };
  };

  it('renders properly', () => {
    const { wrapper } = setup();

    expect(wrapper).toMatchSnapshot();
  });

  test('onSubmit calls handleSubmit', () => {
    const mockHandleSubmit = jest.fn();
    const { submit } = setup({ handleSubmit: mockHandleSubmit });

    submit();

    expect(mockHandleSubmit).toHaveBeenCalled();
  });
});

describe('DeckForm', () => {
  const setup = propOverrides => {
    const defaultProps = Object.assign({
      handleChange: jest.fn(() => jest.fn),
      handleBlur: jest.fn(() => jest.fn),
      touched: {},
      errors: {},
      values: {},
    }, propOverrides);

    const wrapper = shallow(<DeckForm {...defaultProps} />);
    const wrapperInstance = wrapper.instance();

    const pressOnFab = () => {
      wrapper
        .find('FAB')
        .dive()
        .simulate('press');
    };

    return {
      wrapper,
      wrapperInstance,
      pressOnFab
    };
  };

  it('renders properly', () => {
    const { wrapper } = setup();

    expect(wrapper).toMatchSnapshot();
  });

  test('FAB onPress calls addNewQuestion', () => {
    const { pressOnFab, wrapperInstance } = setup();
    const spy = jest
      .spyOn(wrapperInstance, 'addNewQuestion')
      .mockImplementation(() => jest.fn());

    pressOnFab();

    expect(spy).toHaveBeenCalled();
  });

  describe('addNewQuestion', () => {
    it('pushes a new empty question into formik values', () => {
      const values = { questions: [] };
      const mockSetFieldValue = jest.fn();
      const { wrapperInstance } = setup(
        { values,
          setFieldValue: mockSetFieldValue
        }
      );

      wrapperInstance.addNewQuestion();

      expect(
        mockSetFieldValue
      ).toHaveBeenCalledWith('questions.0.question', '');

      expect(
        mockSetFieldValue
      ).toHaveBeenCalledWith('questions.0.answer', '');

      expect(
        mockSetFieldValue
      ).toHaveBeenCalledWith('questions.0.id', expect.any(String));
    });
  });

  describe('handleRemoveFlashcard', () => {
    it('removes the given question from formik values', () => {
      const values = { questions: [
          { id: '1' },
          { id: '2' }
        ]
      };

      const mockSetFieldValue = jest.fn();

      const { wrapperInstance } = setup(
        { values,
          setFieldValue: mockSetFieldValue
        }
      );

      wrapperInstance.handleRemoveFlashcard('1');

      expect(
        mockSetFieldValue
      ).toHaveBeenCalledWith('questions', [{ id: '2' }]);
    });
  });

  describe('setScrollViewRef', () => {
    it('assigns a ref to this.scrollView', () => {
      const mockScrollView = jest.fn();
      const { wrapperInstance } = setup();

      wrapperInstance.setScrollViewRef(mockScrollView);

      expect(wrapperInstance.scrollView).toEqual(mockScrollView);
    });
  });

  describe('handleContentSizeChange', () => {
    it('calls scrollToEnd on scrollView ref', () => {
      const mockScrollToEnd = jest.fn();
      const { wrapperInstance } = setup();
      wrapperInstance.scrollView = { scrollToEnd: mockScrollToEnd };

      wrapperInstance.handleContentSizeChange();

      expect(mockScrollToEnd).toHaveBeenCalledWith({ animated: true });
    });
  });
});
