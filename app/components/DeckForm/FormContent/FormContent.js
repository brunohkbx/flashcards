import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView } from 'react-native';
import { Headline } from 'react-native-paper';
import { Field } from 'formik';
import FormInput from '../FormInput/FormInput';
import Flashcard from '../../Flashcard';

const FormContent = props => {
  const {
    handleChange,
    values,
    scrollViewRef,
    onFlashcardDeleted
  } = props;

  return (
    <ScrollView
      ref={scrollViewRef}
    >
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
          <Flashcard 
            key={question.id} 
            onFlashcardDeleted={() => onFlashcardDeleted(question.id)}
          >
            <Field
              name={`questions.${index}.question`}
              label="Question"
              component={FormInput}
              onChangeText={handleChange(`questions.${index}.question`)}
              autoFocus
              multiline
            />
            <Field
              name={`questions.${index}.answer`}
              label="Answer"
              component={FormInput}
              onChangeText={handleChange(`questions.${index}.answer`)}
              multiline
            />
          </Flashcard>
        ))
      }
    </ScrollView>
  );
};

FormContent.propTypes = {
  handleChange: PropTypes.func.isRequired,
  values: PropTypes.object.isRequired,
  scrollViewRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  onFlashcardDeleted: PropTypes.func.isRequired
};

export default FormContent;
