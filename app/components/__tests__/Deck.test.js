import React from 'react';
import { shallow } from 'enzyme';
import Deck from '../Deck';
import pluralize from 'pluralize';
import { capitalize } from '../../lib/stringUtil';
import configureMockStore from "redux-mock-store";

jest.mock('pluralize');
jest.mock('../../lib/stringUtil');

describe('Deck', () => {
  const setup = propOverrides => {
    const defaultProps = Object.assign({
      title: 'foo',
      flashcardsCount: 5
    }, propOverrides)

    const wrapper = shallow(<Deck {...defaultProps} />);

    return {
      defaultProps,
      wrapper
    }
  }

  it('renders properly', () => {
    const { wrapper } =  setup();

    expect(wrapper).toMatchSnapshot();
  });

  it('capitalizes the title', () => {
    const { defaultProps, wrapper } =  setup();

    expect(capitalize).toHaveBeenCalledWith(defaultProps.title);
  });

  it('pluralizes the deck description based on flashcardsCount', () => {
    const { defaultProps, wrapper } =  setup();

    expect(pluralize).toHaveBeenCalledWith('card', defaultProps.flashcardsCount, true);
  });
});
