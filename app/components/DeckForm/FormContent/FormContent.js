import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ScrollView } from 'react-native';
import { Headline } from 'react-native-paper';
import { Field } from 'formik';
import NoContent from '../NoContent';
import FormInput from '../FormInput/FormInput';
import Flashcard from '../../Flashcard';
import { Fadable } from '../../Animations';
import { waitFor } from '../../../lib/helpers';

class FormContent extends Component {
  state = {
    flashcardToRemove: null
  }

  deleteFlashcard = index => {
    const { onFlashcardDeleted } = this.props;

    this.setState({ flashcardToRemove: null }, () => onFlashcardDeleted(index));
  };

  render() {
    const { values, handleChange, dirty } = this.props;
    const { flashcardToRemove } = this.state;

    return (
      <ScrollView
        contentContainerStyle={[
          { flexGrow: 1 }
        ]}
      >
        <Field
          name="title"
          label="Title"
          component={FormInput}
          onChangeText={handleChange('title')}
        />
        <Headline style={{ marginTop: 25 }}>Cards</Headline>
        {
          values.questions < 1 ?
            <NoContent /> :
            values.questions.map((question, index) => (
              <Fadable
                key={question.id}
                fade={flashcardToRemove === index}
                onAnimationEnd={
                  () => waitFor(10).then(() => this.deleteFlashcard(index))
                }
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
                    autoFocus={dirty && (values.questions.length - 1 === index)}
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
            )
          )
        }
      </ScrollView>
    );
  }
}

FormContent.propTypes = {
  handleChange: PropTypes.func.isRequired,
  values: PropTypes.object.isRequired,
  onFlashcardDeleted: PropTypes.func.isRequired
};

export default FormContent;
