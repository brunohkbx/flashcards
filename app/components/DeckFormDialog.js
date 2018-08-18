import React, { Component } from 'react';
import PropTypes from 'prop-types';
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

export const Form = props => {
  const {
    visible,
    handleDismiss,
    handleSubmit
  } = props;

  validationSchema = Yup.object().shape({
    title: Yup.string()
      .required('Required')
  });

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
      onSubmit={(values, actions) => handleSubmit(values, actions)}
    />
  )
}

export class DeckFormDialog extends Component {
  render() {
    const {
      visible,
      handleDismiss,
      handleSubmit,
      handleChange,
      handleBlur,
      touched,
      errors,
      values
    } = this.props;

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
            errorMessage={touched.title && errors.title ? errors.title : ""}
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
}

Form.propTypes = {
  visible: PropTypes.bool,
  handleDismiss: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
}

Form.defaultProps = {
  visible: false
}

export default Form;
