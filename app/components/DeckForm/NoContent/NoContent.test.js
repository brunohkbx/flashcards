import React from 'react';
import { shallow } from 'enzyme';
import NoContent from './NoContent';

describe('NoContent', () => {
  it('renders properly', () => {
    const wrapper = shallow(<NoContent />);

    expect(wrapper).toMatchSnapshot();
  });
});
