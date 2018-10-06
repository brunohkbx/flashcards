import React from 'react';
import PropTypes from 'prop-types';
import { FAB as _FAB, withTheme } from 'react-native-paper';

export const FAB = ({ primary, handlePress, theme }) => {
  const { colors } = theme;
  const backgroundColor = primary ? colors.primary : colors.accent;

  return (
    <_FAB
      dark
      style={{backgroundColor}}
      icon="add"
      onPress={handlePress}
      style={{margin: 10}}
    />
  );
};

FAB.propTypes = {
  primary: PropTypes.bool,
  handlePress: PropTypes.func.isRequired
}

FAB.defaultProps = {
  primary: false
}

export default withTheme(FAB);
