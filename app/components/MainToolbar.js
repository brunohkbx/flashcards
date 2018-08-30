import * as React from 'react';
import PropTypes from 'prop-types';
import { Toolbar, ToolbarContent, ToolbarAction } from 'react-native-paper';

const MainToolbar = ({ handleSearchPress }) => {
  return (
    <Toolbar>
      <ToolbarContent title="Flashcards" />
      <ToolbarAction icon="search" onPress={handleSearchPress} />
    </Toolbar>
  );
};

MainToolbar.propTypes = {
  handleSearchPress: PropTypes.func.isRequired
};

export default MainToolbar;
