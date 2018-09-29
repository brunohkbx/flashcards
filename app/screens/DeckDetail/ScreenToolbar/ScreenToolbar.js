import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Appbar } from 'react-native-paper';

class ScreenToolbar extends Component {
  navigateTo = route => {
    const { navigation } = this.props;
    const { deckId } = navigation.state.params;

    navigation.navigate(route, { deckId });
  }

  render() {
    const { navigation } = this.props;

    return (
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Deck Details"/>
        <Appbar.Action
          icon="question-answer"
          onPress={() => this.navigateTo('Quiz')}
        />
        <Appbar.Action
          icon="edit"
          onPress={() => this.navigateTo('EditDeck')}
        />
      </Appbar.Header>
    );
  }
}

ScreenToolbar.propTypes = {
  navigation: PropTypes.object.isRequired
};

export default ScreenToolbar;
