import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { HelperText, TextInput } from 'react-native-paper';
import { get } from 'lodash/object';

const FormInput = (
  { field: { name, value }, form: { touched, errors }, ...props}
  ) => {
  const error = !!(get(touched, name) && get(errors, name));

  return (
    <View>
      <TextInput
        error={error}
        value={value}
        {...props}
      />
      {error &&
        <HelperText type="error" visible={error}>
          {get(errors, name)}
        </HelperText>
      }
    </View>
  );
};

FormInput.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired
};

export default FormInput;
