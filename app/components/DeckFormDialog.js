import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from 'react-native-paper';
import TextInput from './TextInput';
import { createDeck } from '../actions';

export const Form = props => {
  const {
    visible,
    handleDismiss,
    createDeck
  } = props;

  validationSchema = Yup.object().shape({
    title: Yup.string()
      .required('Required')
  });

  handleSubmit = (values, FormikBag) => {
    handleDismiss();
    createDeck(values);
    FormikBag.resetForm();
  }

  return (
    <Formik
      initialValues={{ title: '' }}
      validationSchema={validationSchema}
      render={props =>
        <DeckFormDialog
          visible={visible}
          handleDismiss={() => {handleDismiss(); props.resetForm()}}
          {...props}
        />
      }
      onSubmit={handleSubmit}
    />
  )
}

export const DeckFormDialog = props => {
  const {
    visible,
    handleDismiss,
    handleSubmit,
    handleChange,
    handleBlur,
    touched,
    errors,
    values
  } = props;

  return (
    <Dialog
      visible={visible}
      onDismiss={handleDismiss}
    >
      <DialogTitle>Create New Deck</DialogTitle>
      <DialogContent>
        <TextInput
          label="Title"
          value={values.title}
          errorMessage={touched.title && errors.title ? errors.title : null}
          handleChangeText={handleChange('title')}
          handleBlur={handleBlur('title')}
        />
      </DialogContent>
      <DialogActions>
        <Button primary onPress={handleDismiss}>Cancel</Button>
        <Button primary onPress={handleSubmit}>Create</Button>
      </DialogActions>
    </Dialog>
  );
}

Form.propTypes = {
  visible: PropTypes.bool,
  handleDismiss: PropTypes.func.isRequired
}

Form.defaultProps = {
  visible: false
}

const mapDispatchToProps = dispatch => ({
  createDeck: data => dispatch(createDeck(data))
})

export default connect(null, mapDispatchToProps)(Form);
