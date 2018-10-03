import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-native';
import { Colors, Button } from 'react-native-paper';
import CenteredContainer from '../../../components/CenteredContainer';
import Avatar from '../../../components/Avatar';
import AvatarDescription from '../../../components/AvatarDescription';

const NoContent = ({ onEditButtonPress }) => {
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
          style={{ width: 64, height: 64, backgroundColor: Colors.white }}
        />
      </Avatar>
      <AvatarDescription>No flashcards</AvatarDescription>
      <Button
        mode="contained"
        primary
        style={{ marginTop: 10}}
        onPress={onEditButtonPress}
      >
        Edit Deck
      </Button>
    </CenteredContainer>
  );
};

NoContent.propTypes = {
  onEditButtonPress: PropTypes.func.isRequired
};

export default NoContent;
