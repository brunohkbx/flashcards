import React from 'react';
import PropTypes from 'prop-types';
import { Colors, Headline, Subheading, Button } from 'react-native-paper';
import CenteredContainer from '../../../components/CenteredContainer';
import Avatar from '../../../components/Avatar';
import { AssignmentIcon } from '../../../components/Icons';

const Result = ({ score, totalQuestions, onRestartQuiz }) => {
  return (
    <CenteredContainer>
      <Avatar
        width={100}
        height={100}
        borderRadius={50}
        backgroundColor={Colors.white}
      >
        <AssignmentIcon size={50} />
      </Avatar>
      <Headline>Congratulations, you're done</Headline>
      <Subheading>
        You've answered {score} questions correctly out of {totalQuestions}
      </Subheading>
      <Button
        mode="contained"
        primary
        style={{ marginTop: 10}}
        onPress={onRestartQuiz}
      >
        Restart Quiz
      </Button>
    </CenteredContainer>
  );
};

Result.propTypes = {
  score: PropTypes.number.isRequired,
  totalQuestions: PropTypes.number.isRequired,
  onRestartQuiz: PropTypes.func.isRequired
};

export default Result;
