import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Card } from 'react-native-paper';
import CardAction from '../components/Card/CardAction';
import RightAlignedActions from '../components/Card/RightAlignedActions';
import { DeleteIcon } from './Icons';
import { primaryColor } from '../config/theme';

const Content = styled(Card.Content)`
  margin-top: 8;
  padding-bottom: 8;
  margin-horizontal: 8;
`;

const Flashcard = ({ children, onFlashcardDeleted }) => {
  return (
    <Card style={{ marginVertical: 4}}>
      <Content>
        {children}
      </Content>
      {onFlashcardDeleted &&
        <RightAlignedActions>
          <CardAction>
            <DeleteIcon
              size={24}
              color={primaryColor}
              onPress={onFlashcardDeleted}
            />
          </CardAction>
        </RightAlignedActions>
      }
    </Card>
  );
};

Flashcard.propTypes = {
  children: PropTypes.node,
  onFlashcardDeleted: PropTypes.func
};

export default Flashcard;
