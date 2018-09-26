import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import {
  Card,
  Title,
  Caption,
  Divider,
  Text,
  Button,
  Paragraph
} from 'react-native-paper';
import CenteredContainer from './CenteredContainer';

class FlashcardCollapsed extends Component {
  state = { collapsed: false }

  toggleCollapsedState = () => this.setState(prevState => {
    return { collapsed: !prevState.collapsed };
  })

  render() {
    const {
      currentQuestion,
      totalQuestions,
      flashcard
    } = this.props;

    const { collapsed } = this.state;

    return (
      <Card>
        <View style={{ padding: 8}}>
          <Text style={{ paddingTop: 10}}>
            <Title style={{fontSize: 30}}>{currentQuestion}</Title>
            <Caption style={{fontSize: 18}}> OF {totalQuestions}</Caption>
          </Text>
          <Divider />
        </View>
        <Card.Content>
          <CenteredContainer style={{ paddingVertical: 30}}>
            <Title>{flashcard.question}</Title>
            { collapsed && <Paragraph>{flashcard.answer}</Paragraph> }
          </CenteredContainer>
        </Card.Content>
        <Divider />
        <Card.Actions>
          <Button
            primary
            onPress={this.toggleCollapsedState}
          >
            { collapsed ? 'Hide Answer' : 'Show answer' }
          </Button>
        </Card.Actions>
      </Card>
    );
  }
}

FlashcardCollapsed.propTypes = {
  currentQuestion: PropTypes.number.isRequired,
  totalQuestions: PropTypes.number.isRequired,
  flashcard: PropTypes.shape({
    question: PropTypes.string.isRequired,
    answer: PropTypes.string.isRequired
  })
};

export default FlashcardCollapsed;
