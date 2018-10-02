import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Formik, FieldArray } from 'formik';
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
        answer: Yup.string().required('Required'),
        id: Yup.string().required('Required')
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
      render={formikProps => (
        <FieldArray name="questions" component={DeckForm} />
      )}
      onSubmit={(values, actions) => handleSubmit(values, actions)}
    />
  );
};

export class DeckForm extends Component {
  addNewFlashcard = () => {
    const { push } = this.props;

    push({ question: '', answer: '', id: uuid() });
  }

  handleFlashcardDeleted = index => {
    const { remove } = this.props;

    remove(index);
  }

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
            onFlashcardDeleted={this.handleFlashcardDeleted}
            {...this.props.form}
          />
        </KeyboardAvoidingView>
        <BottomRightContainer right={16} bottom={16} >
          <FAB handlePress={this.addNewFlashcard} />
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
