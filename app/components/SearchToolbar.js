import * as React from 'react';
import PropTypes from 'prop-types';
import { Colors, Searchbar, Toolbar } from 'react-native-paper';

const SearchToolbar = ({ handleChangeText, value, handleIconPress }) => {
  return (
    <Toolbar style={{backgroundColor: Colors.white}}>
      <Searchbar
        placeholder="Search Decks"
        onChangeText={handleChangeText}
        value={value}
        icon="arrow-back"
        style={{elevation: 0}}
        onIconPress={handleIconPress}
        autoFocus
      />
    </Toolbar>
  );
};

SearchToolbar.propTypes = {
  value: PropTypes.string.isRequired,
  handleIconPress: PropTypes.func.isRequired
};

SearchToolbar.defaultProps = {
  value: ''
};

export default SearchToolbar;
