import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Toolbar,
  ToolbarBackAction,
  ToolbarContent,
  ToolbarAction
} from 'react-native-paper';

class ScreenToolbar extends Component {
  navigateTo = route => {
    const { navigation } = this.props;
    const { deckId } = navigation.state.params;

    navigation.navigate(route, { deckId });
  }

  render() {
    const { navigation } = this.props;

    return (
      <Toolbar>
        <ToolbarBackAction onPress={() => navigation.goBack()} />
        <ToolbarContent title="Deck Details"/>
        <ToolbarAction
          icon="question-answer"
          onPress={() => {}}
        />
        <ToolbarAction
          icon="edit"
          onPress={() => this.navigateTo('EditDeck')}
        />
      </Toolbar>
    );
  }
}

ScreenToolbar.propTypes = {
  navigation: PropTypes.object.isRequired
};

export default ScreenToolbar;
