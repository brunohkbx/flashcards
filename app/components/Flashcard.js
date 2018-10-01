import React from 'react';
import PropTypes from 'prop-types';
import { Card, IconButton } from 'react-native-paper';
import RightAlignedActions from '../components/Card/RightAlignedActions';
import { theme } from '../config/theme';

const Flashcard = ({ children, onFlashcardDeleted }) => {
  return (
    <Card style={{ marginVertical: 4}}>
      {onFlashcardDeleted &&
        <RightAlignedActions>
          <IconButton
            icon="close"
            onPress={onFlashcardDeleted}
            color={theme.colors.primary}
            style={{ marginVertical: 0 }}
          />
        </RightAlignedActions>
      }
      <Card.Content style={onFlashcardDeleted ? null : { paddingTop: 16 }}>
        {children}
      </Card.Content>
    </Card>
  );
};

Flashcard.propTypes = {
  children: PropTypes.node,
  onFlashcardDeleted: PropTypes.func
};

export default Flashcard;
