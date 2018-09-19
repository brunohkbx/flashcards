import React from 'react';
import { Caption, Colors } from 'react-native-paper';
import CenteredContainer from '../../../components/CenteredContainer';
import Avatar from '../../../components/Avatar';
import { FlashcardIcon } from '../../../components/Icons';

const NoContent = () => {
  return (
    <CenteredContainer>
      <Avatar
        width={100}
        height={100}
        borderRadius={50}
        backgroundColor={Colors.white}
      >
        <FlashcardIcon size={50} />
      </Avatar>
      <Caption style={{ fontSize: 18}}>No flashcards</Caption>
    </CenteredContainer>
  );
};

export default NoContent;
