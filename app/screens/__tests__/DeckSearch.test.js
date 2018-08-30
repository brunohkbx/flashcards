import React from 'react';
import { shallow } from 'enzyme';
import DeckSearch from '../DeckSearch';

describe('DeckSearch', () => {
  const setup = propOverrides => {
    const defaultProps = Object.assign({
      navigation: {
        setParams: jest.fn()
      }
    }, propOverrides)

    const wrapper = shallow(<DeckSearch {...defaultProps} />);

    return {
      wrapper
    }
  }

  it('renders properly', () => {
    const { wrapper } = setup();

    expect(wrapper).toMatchSnapshot();
  })
});
