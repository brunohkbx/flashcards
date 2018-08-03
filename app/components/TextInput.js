import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { TextInput as _TextInput } from 'react-native-paper';
import ErrorText from './ErrorText';

const TextInput = props => {
  const {
    label,
    value,
    errorMessage,
    handleChangeText,
    handleBlur
  } = props;

  return (
    <View>
      <_TextInput
        label={label}
        value={value}
        onChangeText={handleChangeText}
        onBlur={handleBlur}
        error={errorMessage.length > 0}
        autoFocus
      />
      <ErrorText>{errorMessage}</ErrorText>
    </View>
  );
}

TextInput.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  errorMessage: PropTypes.string,
  handleChangeText: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
}

TextInput.defaultProps = {
  value: '',
  errorMessage: ''
}

export default TextInput;
