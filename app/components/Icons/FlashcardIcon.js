import React from 'react';
import PropTypes from 'prop-types';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

const FlashcardIcon = ({ size, color, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Ionicons
        name="ios-card-outline"
        color={color}
        size={size}
      />
    </TouchableOpacity>
  );
};

FlashcardIcon.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
  onPress: PropTypes.func
};

export default FlashcardIcon;
