import React from 'react';
import { Colors } from 'react-native-paper';
import { shallow } from 'enzyme';
import Avatar from '../Avatar';

describe('Avatar', () => {
  const setup = propOverrides => {
    const defaultProps = Object.assign({
      width: 100,
      height: 100,
      borderRadius: 50,
      backgroundColor: Colors.white
    }, propOverrides);

    const wrapper = shallow(<Avatar {...defaultProps} />);

    return { wrapper };
  };

  it('renders properly', () => {
    const { wrapper } = setup();

    expect(wrapper).toMatchSnapshot();
  });
});
