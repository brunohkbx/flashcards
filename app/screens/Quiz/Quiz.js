import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { View, ScrollView } from 'react-native';
import { Button, DefaultTheme } from 'react-native-paper';
import Container from '../../components/Container';
import FlashcardCollapsed from '../../components/FlashcardCollapsed';
import { Fadable } from '../../components/Animations/index';
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
    return { correct: prevState.correct + 1, fade: true };
  })

  scoreNegative = () => this.setState(prevState => {
    return { incorrect: prevState.incorrect + 1, fade: true };
  })

  renderNextFlashcard = () => this.setState(prevState => {
    return { currentQuestion: prevState.currentQuestion + 1, fade: false };
  })

  handleRestartQuiz = () => this.setState(
    { currentQuestion: 1, correct: 0, incorrect: 0, fade: false }
  )

  render() {
    const { deck } = this.props;
    const { currentQuestion, fade, correct } = this.state;
    const totalQuestions = deck.questions.length;
    const finished = (currentQuestion - 1) === totalQuestions;

    return (
      <Container>
        {!finished &&
          <ScrollView contentContainerStyle={{flexGrow: 1}}>
            <Fadable fade={fade} onAnimationEnd={this.renderNextFlashcard}>
              <FlashcardCollapsed
                currentQuestion={currentQuestion}
                totalQuestions={totalQuestions}
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
        {finished &&
          <Result
            score={correct}
            totalQuestions={totalQuestions}
            onRestartQuiz={this.handleRestartQuiz}
          />
        }
      </Container>
    );
  }
}

const mapStateToProps = ({ decks }, { navigation }) => {
  const { deckId } = navigation.state.params;

  return {
    deck: decks[deckId]
  };
};

export default connect(mapStateToProps)(Quiz);
