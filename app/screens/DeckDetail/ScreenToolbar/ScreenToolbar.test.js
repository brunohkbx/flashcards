import React from 'react';
import { shallow } from 'enzyme';
import ScreenToolbar from './ScreenToolbar';

describe('ScreenToolbar', () => {
  const setup = propOverrides => {
    const defaultProps = Object.assign({
      navigation: {
        goBack: jest.fn(),
        state: jest.fn(),
        navigate: jest.fn()
      }
    }, propOverrides);

    const wrapper = shallow(<ScreenToolbar {...defaultProps} />);
    const wrapperInstance = wrapper.instance();

    const goBack = () => wrapper.find('ToolbarBackAction').simulate('press');
    const edit = () => wrapper.find({ icon: 'edit' }).simulate('press');

    return { wrapper, wrapperInstance, goBack, edit };
  };

  it('renders properly', () => {
    const { wrapper } = setup();

    expect(wrapper).toMatchSnapshot();
  });

  describe('navigateTo', () => {
    it('navigates to the given screen and pass deckId as props', () => {
      const mockNavigate = jest.fn();
      const { wrapperInstance } = setup();
      wrapperInstance.props.navigation.state.params = { deckId: '1' };
      wrapperInstance.props.navigation.navigate = mockNavigate;

      wrapperInstance.navigateTo('EditDeck');

      expect(mockNavigate).toHaveBeenCalledWith('EditDeck', { deckId: '1'} );
    });
  });

  test('ToolbarBackAction onPress goes to previous screen', () => {
    const mockNavigationGoBack = jest.fn();
    const { wrapperInstance, goBack } = setup();
    wrapperInstance.props.navigation.goBack = mockNavigationGoBack;

    goBack();

    expect(mockNavigationGoBack).toHaveBeenCalled();
  });

  test('ToolbarAction Edit calls navigateTo EditDeck', () => {
    const mockNavigateTo = jest.fn();
    const { wrapperInstance, edit } = setup();
    wrapperInstance.navigateTo = mockNavigateTo;

    edit();

    expect(mockNavigateTo).toHaveBeenCalled();
  });
});
