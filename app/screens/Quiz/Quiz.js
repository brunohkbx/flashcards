import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { View, ScrollView } from 'react-native';
import { Button, DefaultTheme } from 'react-native-paper';
import Container from '../../components/Container';
import FlashcardCollapsed from '../../components/FlashcardCollapsed';
import { Fadable } from '../../components/Animations';
import Result from './Result';

const ButtonContainer = styled(View)`
  flex: 1;
  flex-direction: row;
  justify-content: space-around;
  align-items: flex-end;
  padding-vertical: 30;
`;

export class Quiz extends Component {
  state = {
    currentQuestion: 1,
    correct: 0,
    incorrect: 0,
    fade: false
  }

  scorePositive = () => this.setState(prevState => {
    if (this.state.fade)
      return;

    return { correct: prevState.correct + 1, fade: true };
  })

  scoreNegative = () => this.setState(prevState => {
    if (this.state.fade)
      return;

    return { incorrect: prevState.incorrect + 1, fade: true };
  })

  renderNextFlashcard = () => this.setState(prevState => {
    return { currentQuestion: prevState.currentQuestion + 1, fade: false };
  })

  handleRestartQuiz = () => this.setState(
    { currentQuestion: 1, correct: 0, incorrect: 0, fade: false }
  )

  totalQuestions = (() => { return this.props.deck.questions.length; })()

  isFinished = () => {
    const { currentQuestion } = this.state;

    return (currentQuestion - 1) === this.totalQuestions;
  }

  render() {
    const { deck, settings } = this.props;
    const { currentQuestion, fade, correct } = this.state;

    return (
      <Container>
        {!this.isFinished() &&
          <ScrollView contentContainerStyle={{flexGrow: 1}}>
            <Fadable fade={fade} onAnimationEnd={this.renderNextFlashcard}>
              <FlashcardCollapsed
                currentQuestion={currentQuestion}
                totalQuestions={this.totalQuestions}
                flashcard={deck.questions[currentQuestion - 1]}
              />
            </Fadable>
            <ButtonContainer>
              <Button
                mode="outlined"
                color={DefaultTheme.colors.accent}
                icon="close"
                onPress={this.scoreNegative}
              >
                I was wrong
              </Button>
              <Button
                mode="contained"
                primary
                icon="done"
                onPress={this.scorePositive}
              >
                I was right
              </Button>
            </ButtonContainer>
          </ScrollView>
        }
        {this.isFinished() &&
          <Result
            score={correct}
            totalQuestions={this.totalQuestions}
            onRestartQuiz={this.handleRestartQuiz}
            receiveNotifications={settings.receiveNotifications}
          />
        }
      </Container>
    );
  }
}

const mapStateToProps = ({ decks, settings }, { navigation }) => {
  const { deckId } = navigation.state.params;

  return {
    deck: decks[deckId],
    settings
  };
};

export default connect(mapStateToProps)(Quiz);
