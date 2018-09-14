import React from 'react';
import { shallow } from 'enzyme';
import BottomFAB from '../BottomFAB';

describe('BottomFAB', () => {
  const setup = propOverrides => {
    const defaultProps = Object.assign({
      handlePress: jest.fn()
    }, propOverrides)

    const wrapper = shallow(<BottomFAB {...defaultProps} />);

    return { wrapper };
  };

  it('renders properly', () => {
    const { wrapper } = setup();

    expect(wrapper).toMatchSnapshot();
  });
});
