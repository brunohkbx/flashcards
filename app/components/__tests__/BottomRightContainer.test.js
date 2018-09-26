import React from 'react';
import { shallow } from 'enzyme';
import BottomRightContainer from '../BottomRightContainer';

describe('BottomRightContainer', () => {
  const setup = propOverrides => {
    const defaultProps = Object.assign({
      right: 16,
      bottom: 16
    }, propOverrides);

    const wrapper = shallow(<BottomRightContainer {...defaultProps} />);

    return { wrapper };
  };

  it('renders properly', () => {
    const { wrapper } = setup();

    expect(wrapper).toMatchSnapshot();
  });
});
