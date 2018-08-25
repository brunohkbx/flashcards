import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import {
  Button,
  Card,
  CardContent,
  CardActions,
  Title,
  Subheading,
} from 'react-native-paper';
import { capitalize } from '../lib/stringUtil';
import pluralize from 'pluralize';
import { TouchableOpacity } from 'react-native';

const Deck = ({ title, flashcardsCount, handleEditPress, handleDeletePress }) => {
  return (
    <Card>
      <TouchableOpacity>
        <CardContent style={{marginHorizontal: 8}}>
          <Title>{capitalize(title)}</Title>
          <Subheading>{pluralize('card', flashcardsCount, true)}</Subheading>
        </CardContent>
        <CardActions>
          <Button primary onPress={handleEditPress}>Edit</Button>
          <Button primary onPress={handleDeletePress}>Delete</Button>
        </CardActions>
      </TouchableOpacity>
    </Card>
  );
}

Deck.propTypes = {
  title: PropTypes.string.isRequired,
  flashcardsCount: PropTypes.number,
  handleEditPress: PropTypes.func.isRequired,
  handleDeletePress: PropTypes.func.isRequired
}

Deck.defaultProps = {
  flashcardsCount: 0
}

export default Deck;
