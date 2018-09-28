import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as Yup from 'yup';
import uuid from 'uuid';
import { View, KeyboardAvoidingView } from 'react-native';
import FAB from '../FAB';
import BottomRightContainer from '../BottomRightContainer';
import { Header } from 'react-navigation';
import FormContent from './FormContent';

export const FormikDeckForm = ({ handleSubmit, initialValues, formRef }) => {
  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Required'),
    questions: Yup.array().of(
      Yup.object().shape({
        question: Yup.string().required('Required'),
        answer: Yup.string().required('Required')
      })
    )
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      enableReinitialize
      validateOnBlur={false}
      ref={formRef}
      component={DeckForm}
      onSubmit={(values, actions) => handleSubmit(values, actions)}
    />
  );
};

export class DeckForm extends Component {
  addNewQuestion = () => {
    const { values, setFieldValue } = this.props;
    const index = values.questions.length;

    setFieldValue(`questions.${index}.question`, '');
    setFieldValue(`questions.${index}.answer`, '');
    setFieldValue(`questions.${index}.id`, uuid());
  }

  handleRemoveFlashcard = id => {
    const { values, setFieldValue } = this.props;

    const questions = values.questions.filter(question => question.id !== id);
    setFieldValue('questions', questions);
  }

  setScrollViewRef = element => this.scrollView = element;

  render() {
    return (
      <View style={{flex: 1, padding: 8}}>
        <KeyboardAvoidingView
          style={{flex: 1}}
          behavior="padding"
          enabled
          keyboardVerticalOffset={Header.HEIGHT + 35}
        >
          <FormContent
            scrollViewRef={this.setScrollViewRef}
            onFlashcardDeleted={this.handleRemoveFlashcard}
            {...this.props}
          />
        </KeyboardAvoidingView>
        <BottomRightContainer right={16} bottom={16} >
          <FAB handlePress={() => this.addNewQuestion()} />
        </BottomRightContainer>
      </View>
    );
  }
}

FormikDeckForm.propTypes = {
  initialValues: PropTypes.shape({
    title: PropTypes.string.isRequired,
    questions: PropTypes.array.isRequired,
    id: PropTypes.string.isRequired
  }),
  formRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  handleSubmit: PropTypes.func.isRequired,
};

export default FormikDeckForm;
