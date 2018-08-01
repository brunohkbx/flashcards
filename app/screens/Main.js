import React from 'react';
import { connect } from 'react-redux'
import { View } from 'react-native';
import Deck from '../components/Deck';

export const Main = props => {
  const { decks } = props;

  return (
    <View>
      { decks.map((deck, index) => (
        <Deck
          key={`${deck['title']} - ${index}`}
          title={deck['title']}
          flashcardsCount={deck['questions'].length}
        />
      ))}
    </View>
  );
}

const mapStateToProps = ({ decks }) => ({ decks });

export default connect(mapStateToProps)(Main);
