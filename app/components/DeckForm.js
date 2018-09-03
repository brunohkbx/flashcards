import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { HelperText, TextInput } from 'react-native-paper';
import { View } from 'react-native';

export const FormikDeckForm = ({ handleSubmit, initialValues, formRef }) => {
  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Required')
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

export const DeckForm = props => {
  const {
    handleChange,
    handleBlur,
    touched,
    errors,
    values,
  } = props;

  return (
    <View>
      <TextInput
        label="Title"
        value={values.title}
        onChangeText={handleChange('title')}
        onBlur={handleBlur('title')}
        error={!!(touched.title && errors.title)}
        autoFocus
      />
      <HelperText type="error" visible={!!(touched.title && errors.title)}>
        {errors.title}
      </HelperText>
    </View>
  );
};

FormikDeckForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.object,
  formRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
};

FormikDeckForm.defaultProps = {
  initialValues: { title: '', questions: [] }
};

export default FormikDeckForm;
