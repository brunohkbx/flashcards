import React from 'react';
import PropTypes from 'prop-types';
import { FAB as _FAB, withTheme } from 'react-native-paper';

export const FAB = ({ primary, icon, handlePress, theme }) => {
  const { colors } = theme;
  const backgroundColor = primary ? colors.primary : colors.accent;

  return (
    <_FAB
      dark
      style={{backgroundColor}}
      icon={icon}
      onPress={handlePress}
      style={{margin: 10}}
    />
  );
};

FAB.propTypes = {
  primary: PropTypes.bool,
  icon: PropTypes.string.isRequired,
  handlePress: PropTypes.func.isRequired
};

FAB.defaultProps = {
  primary: false
};

export default withTheme(FAB);
