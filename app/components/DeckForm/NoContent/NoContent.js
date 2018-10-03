import React from 'react';
import { Image } from 'react-native';
import { Colors } from 'react-native-paper';
import CenteredContainer from '../../../components/CenteredContainer';
import Avatar from '../../../components/Avatar';
import AvatarDescription from '../../../components/AvatarDescription';

const NoContent = () => {
  return (
    <CenteredContainer>
      <Avatar
        width={100}
        height={100}
        borderRadius={50}
        backgroundColor={Colors.white}
        style={{ marginBottom: 15 }}
      >
        <Image
          source={require('../../../assets/images/flashcard.png')}
          style={{ width: 64, height: 64 }}
        />
      </Avatar>
      <AvatarDescription>No flashcards</AvatarDescription>
    </CenteredContainer>
  );
};

export default NoContent;
