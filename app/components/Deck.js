import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Card,
  Title,
  Subheading,
} from 'react-native-paper';
import { capitalize } from '../lib/stringUtil';
import pluralize from 'pluralize';
import { TouchableOpacity } from 'react-native';

const Deck = props => {
  const {
    title,
    flashcardsCount,
    handleEditPress,
    handleDeletePress,
    onPress
  } = props;

  return (
    <Card style={{ marginVertical: 4}}>
      <TouchableOpacity onPress={onPress}>
        <Card.Content>
          <Title>{capitalize(title)}</Title>
          <Subheading>{pluralize('card', flashcardsCount, true)}</Subheading>
        </Card.Content>
        <Card.Actions>
          <Button primary style={{paddingRight: 9}} onPress={handleEditPress}>Edit</Button>
          <Button primary onPress={handleDeletePress}>Delete</Button>
        </Card.Actions>
      </TouchableOpacity>
    </Card>
  );
}

Deck.propTypes = {
  title: PropTypes.string.isRequired,
  flashcardsCount: PropTypes.number,
  handleEditPress: PropTypes.func.isRequired,
  handleDeletePress: PropTypes.func.isRequired,
  onPress: PropTypes.func.isRequired
}

Deck.defaultProps = {
  flashcardsCount: 0
}

export default Deck;
