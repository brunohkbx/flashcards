import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView } from 'react-native';
import { Headline } from 'react-native-paper';
import { Field } from 'formik';
import FormInput from '../FormInput/FormInput';
import FlashCard from '../../FlashCard';

const FormContent = props => {
  const {
    handleChange,
    values,
    scrollViewRef,
    handleContentSizeChange
  } = props;

  return (
    <ScrollView
      ref={scrollViewRef}
      onContentSizeChange={handleContentSizeChange}
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
          <FlashCard key={values.id}>
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
          </FlashCard>
        ))
      }
    </ScrollView>
  );
};

FormContent.propTypes = {
  handleChange: PropTypes.func.isRequired,
  values: PropTypes.object.isRequired,
  scrollViewRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  handleContentSizeChange: PropTypes.func
};

export default FormContent;
