import React from 'react';
import PropTypes from 'prop-types';
import { FAB as _FAB } from 'react-native-paper';
import { primaryColor, secondaryColor } from '../config/theme';

const FAB = ({ primary, handlePress }) => {
  const backgroundColor = primary ? primaryColor : secondaryColor;

  return (
    <_FAB
      dark
      style={{backgroundColor}}
      icon="add"
      onPress={handlePress}
    />
  );
}

FAB.propTypes = {
  primary: PropTypes.bool,
  handlePress: PropTypes.func.isRequired
}

FAB.defaultProps = {
  primary: false
}

export default FAB;
