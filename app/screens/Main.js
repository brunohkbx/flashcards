import React from 'react';
import { View } from 'react-native';
import Deck from '../components/Deck';

const Main = () => {
  return (
    <View>
      <Deck title='udacicards' flashcardsCount={9}/>
      <Deck title='udacicards' flashcardsCount={0}/>
    </View>
  );
}

export default Main;
