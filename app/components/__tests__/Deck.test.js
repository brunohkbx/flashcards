import React from 'react';
import { shallow } from 'enzyme';
import Deck from '../Deck';
import pluralize from 'pluralize';
import { capitalize } from '../../lib/stringUtil';

jest.mock('pluralize');
jest.mock('../../lib/stringUtil');

const defaultProps = ({ title: 'foo', flashcardsCount: 5 });

describe('Deck', () => {
  it('renders properly', () => {
    const wrapper = shallow(<Deck {...defaultProps} />);

    expect(wrapper).toMatchSnapshot();
  })

  it('capitalizes the title', () => {
    shallow(<Deck {...defaultProps} />);

    expect(capitalize).toHaveBeenCalledWith(defaultProps.title);
  })

  it('pluralizes the deck description based on flashcardsCount', () => {
    shallow(<Deck {...defaultProps} />);

    expect(pluralize).toHaveBeenCalledWith('card', defaultProps.flashcardsCount, true);
  })
});
