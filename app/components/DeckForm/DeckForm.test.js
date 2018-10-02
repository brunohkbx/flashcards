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
      form: {
        handleChange: jest.fn(() => jest.fn),
        values: {},
      }
    }, propOverrides);

    const wrapper = shallow(<DeckForm {...defaultProps} />);
    const wrapperInstance = wrapper.instance();

    return { wrapper, wrapperInstance };
  };

  it('renders properly', () => {
    const { wrapper } = setup();

    expect(wrapper).toMatchSnapshot();
  });

  describe('addNewFlashcard', () => {
    it('pushes a new empty question into formik values', () => {
      const mockPush = jest.fn();
      const { wrapperInstance } = setup({ push: mockPush });

      wrapperInstance.addNewFlashcard();

      expect(mockPush).toHaveBeenCalledWith(
        {
          question: '',
          answer: '',
          id: expect.any(String)
        }
      );
    });
  });

  describe('handleFlashcardDeleted', () => {
    it('removes the given question from formik values', () => {
      const mockRemove = jest.fn();
      const { wrapperInstance } = setup({ remove: mockRemove });

      wrapperInstance.handleFlashcardDeleted('1');

      expect(mockRemove).toHaveBeenCalledWith('1');
    });
  });
});
