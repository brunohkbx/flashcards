import React from 'react';
import PropTypes from 'prop-types';
import { MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

const AssignmentIcon = ({ size, color, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <MaterialIcons
        name="assignment"
        color={color}
        size={size}
      />
    </TouchableOpacity>
  );
};

AssignmentIcon.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
  onPress: PropTypes.func
};

export default AssignmentIcon;
