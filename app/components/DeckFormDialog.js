import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  HelperText,
  TextInput
} from 'react-native-paper';

export const Form = props => {
  const {
    visible,
    handleDismiss,
    handleSubmit,
    deck,
    title,
    actionSubmitText
  } = props;

  validationSchema = Yup.object().shape({
    title: Yup.string().required('Required')
  });

  return (
    <Formik
      initialValues={deck}
      validationSchema={validationSchema}
      enableReinitialize
      render={props =>
        <DeckFormDialog
          visible={visible}
          handleDismiss={() => { handleDismiss(); props.resetForm({}); }}
          title={title}
          actionSubmitText={actionSubmitText}
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
      values,
      title,
      actionSubmitText
    } = this.props;

    return (
      <Dialog
        visible={visible}
        onDismiss={handleDismiss}
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
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
        </DialogContent>
        <DialogActions>
          <Button primary onPress={handleDismiss}>Cancel</Button>
          <Button primary onPress={handleSubmit}>{actionSubmitText}</Button>
        </DialogActions>
      </Dialog>
    );
  }
}

Form.propTypes = {
  visible: PropTypes.bool,
  handleDismiss: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  actionSubmitText: PropTypes.string.isRequired
}

Form.defaultProps = {
  visible: false
}

export default Form;
