import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Card, CardContent } from 'react-native-paper';
import CardAction from '../components/Card/CardAction';
import RightAlignedActions from '../components/Card/RightAlignedActions';
import { DeleteIcon } from './Icons';
import { primaryColor } from '../config/theme';
import { View }  from 'react-native';

const Content = styled(CardContent)`
  padding-top: 0;
  padding-bottom: 8;
  margin-horizontal: 8;
`;

const Flashcard = ({ children, onFlashcardDeleted }) => {
  return (
    <Card>
      <Content>
        {children}
      </Content>
      <RightAlignedActions>
        <CardAction>
          <DeleteIcon
            size={24}
            color={primaryColor}
            onPress={onFlashcardDeleted}
          />
        </CardAction>
      </RightAlignedActions>
    </Card>
  );
};

Flashcard.propTypes = {
  children: PropTypes.node,
  onFlashcardDeleted: PropTypes.func.isRequired
};

export default Flashcard;
