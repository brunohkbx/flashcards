import React from 'react';
import { TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { white } from '../../config/theme';

const SearchIcon = () => {
  return (
    <TouchableOpacity style={{ marginHorizontal: 10 }} onPress={() => {}}>
      <MaterialIcons
        name="search"
        size={24}
        color={white}
      />
    </TouchableOpacity>
  );
}


export default SearchIcon;
