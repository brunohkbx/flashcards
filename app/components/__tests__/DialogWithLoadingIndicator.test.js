import React from 'react';
import { shallow } from 'enzyme';
import DialogWithLoadingIndicator from '../DialogWithLoadingIndicator';
import * as helpers from '../../lib/helpers';

describe('DialogWithLoadingIndicator', () => {
  const setup = propOverrides => {
    const defaultProps = Object.assign({
      visible: true,
      loadingMessage: 'Editing.....'
    }, propOverrides);

    const wrapper = shallow(<DialogWithLoadingIndicator {...defaultProps} />);

    return { wrapper };
  };

  it('renders properly on android', () => {
    const { wrapper } =  setup();
    helpers.getOS = jest.fn(() => 'android');

    expect(wrapper).toMatchSnapshot();
  });

  it('renders properly on ios', () => {
    const { wrapper } =  setup();
    helpers.getOS = jest.fn(() => 'ios');

    expect(wrapper).toMatchSnapshot();
  });
});
