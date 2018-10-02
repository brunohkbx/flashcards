import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ScrollView } from 'react-native';
import { Headline } from 'react-native-paper';
import { Field } from 'formik';
import FormInput from '../FormInput/FormInput';
import Flashcard from '../../Flashcard';
import { Fadable } from '../../Animations';

class FormContent extends Component {
  state = {
    flashcardToRemove: null
  }

  deleteDeck = index => {
    const { onFlashcardDeleted } = this.props;

    this.setState({ flashcardToRemove: null }, () => onFlashcardDeleted(index));
  };

  render() {
    const { values, handleChange } = this.props;
    const { flashcardToRemove } = this.state;

    return (
      <ScrollView>
        <Field
          name="title"
          label="Title"
          component={FormInput}
          onChangeText={handleChange('title')}
          autoFocus
        />
        <Headline>Cards</Headline>
        {
          values.questions.map((question, index) => (
            <Fadable
              key={question.id}
              fade={flashcardToRemove === index}
              onAnimationEnd={() => this.deleteDeck(index)}
            >
              <Flashcard
                onFlashcardDeleted={
                  () => this.setState({ flashcardToRemove: index })
                }
              >
                <Field
                  name={`questions.${index}.question`}
                  label="Question"
                  component={FormInput}
                  onChangeText={handleChange(`questions.${index}.question`)}
                  autoFocus
                  multiline
                  mode="outlined"
                />
                <Field
                  name={`questions.${index}.answer`}
                  label="Answer"
                  component={FormInput}
                  onChangeText={handleChange(`questions.${index}.answer`)}
                  multiline
                  mode="outlined"
                />
              </Flashcard>
            </Fadable>
          ))
        }
      </ScrollView>
    );
  }
};

FormContent.propTypes = {
  handleChange: PropTypes.func.isRequired,
  values: PropTypes.object.isRequired,
  onFlashcardDeleted: PropTypes.func.isRequired
};

export default FormContent;
