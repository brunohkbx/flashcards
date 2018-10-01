import React from 'react';
import { Image } from 'react-native';
import { Caption, Colors } from 'react-native-paper';
import CenteredContainer from '../../../components/CenteredContainer';
import Avatar from '../../../components/Avatar';

const NoContent = () => {
  return (
    <CenteredContainer>
      <Avatar
        width={100}
        height={100}
        borderRadius={50}
        backgroundColor={Colors.white}
      >
        <Image
          source={require('../../../assets/images/card_stack.png')}
          style={{ width: 64, height: 64 }}
        />
      </Avatar>
      <Caption style={{ fontSize: 18}}>No decks</Caption>
    </CenteredContainer>
  );
};

export default NoContent;
