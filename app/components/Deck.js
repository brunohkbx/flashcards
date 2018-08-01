import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Card,
  CardContent,
  CardActions,
  Colors,
  Title,
  Paragraph
} from 'react-native-paper';
import { capitalize } from '../lib/stringUtil';
import pluralize from 'pluralize';

const Deck = ({ title, flashcardsCount }) => {
  return (
    <Card>
      <CardContent style={{marginHorizontal: 8}}>
        <Title>{capitalize(title)}</Title>
        <Paragraph>{pluralize('card', flashcardsCount, true)}</Paragraph>
      </CardContent>
      <CardActions>
        <Button primary onPress={() => {}}>View</Button>
        <Button color={Colors.pink500} onPress={() => {}}>Delete</Button>
      </CardActions>
    </Card>
  );
}

Deck.propTypes = {
  title: PropTypes.string.isRequired,
  flashcardsCount: PropTypes.number
}

Deck.defaultProps = {
  flashcardsCount: 0
}

export default Deck;
