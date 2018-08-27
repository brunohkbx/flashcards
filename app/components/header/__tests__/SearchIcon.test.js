import React from 'react';
import { shallow } from 'enzyme';
import SearchIcon from '../SearchIcon';

describe('SearchIcon', () => {
  const setup = () => {
    const wrapper = shallow(<SearchIcon />);

    return {
      wrapper
    }
  }

  it('renders properly', () => {
    const { wrapper } = setup();

    expect(wrapper).toMatchSnapshot();
  });
});
