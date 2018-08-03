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

const Deck = ({ title, flashcardsCount }) => {
  return (
    <Card style={styles.card}>
      <TouchableOpacity>
        <CardContent style={{marginHorizontal: 8}}>
          <Title>{capitalize(title)}</Title>
          <Subheading>{pluralize('card', flashcardsCount, true)}</Subheading>
        </CardContent>
        <CardActions>
          <Button primary onPress={() => {}}>Edit</Button>
          <Button primary onPress={() => {}}>Delete</Button>
        </CardActions>
      </TouchableOpacity>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    elevation: 0,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(0, 0, 0, .32)'
  }
});

Deck.propTypes = {
  title: PropTypes.string.isRequired,
  flashcardsCount: PropTypes.number
}

Deck.defaultProps = {
  flashcardsCount: 0
}

export default Deck;
