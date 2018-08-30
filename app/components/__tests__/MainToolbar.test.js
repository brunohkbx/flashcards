import React from 'react';
import { shallow } from 'enzyme';
import MainToolbar from '../MainToolbar';

describe('MainToolbar', () => {
  const setup = propOverrides => {
    const defaultProps = Object.assign({
      handleSearchPress: jest.fn()
    }, propOverrides)

    const wrapper = shallow(<MainToolbar {...defaultProps} />);

    const pressSearchIcon = () => {
      wrapper
        .find('ToolbarAction')
        .simulate('press')
    }

    return {
      wrapper,
      pressSearchIcon
    }
  }

  it('renders properly', () => {
    const { wrapper } = setup();

    expect(wrapper).toMatchSnapshot();
  });

  test('SearchIcon onPress calls handleSearchPress', () => {
    const mockhandleSearchPress = jest.fn();
    const { pressSearchIcon } = setup({ handleSearchPress: mockhandleSearchPress });

    pressSearchIcon();

    expect(mockhandleSearchPress).toHaveBeenCalled();
  });
});
