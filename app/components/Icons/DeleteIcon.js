import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const DeleteIcon = ({ size, color, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <MaterialCommunityIcons
        name="delete"
        color={color}
        size={size}
      />
    </TouchableOpacity>
  );
};

DeleteIcon.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
  onPress: PropTypes.func.isRequired
};

export default DeleteIcon;
