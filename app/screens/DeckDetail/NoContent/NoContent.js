import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-native';
import { Caption, Colors, Button } from 'react-native-paper';
import CenteredContainer from '../../../components/CenteredContainer';
import Avatar from '../../../components/Avatar';

const NoContent = ({ onEditButtonPress }) => {
  return (
    <CenteredContainer>
      <Avatar
        width={100}
        height={100}
        borderRadius={50}
        backgroundColor={Colors.white}
      >
        <Image
          source={require('../../../assets/images/flashcard.png')}
          style={{ width: 64, height: 64, backgroundColor: Colors.white }}
        />
      </Avatar>
      <Caption style={{ fontSize: 18}}>No flashcards</Caption>
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
