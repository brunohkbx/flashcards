import React, { Component } from 'react';
import { connect } from 'react-redux'
import { View, FlatList } from 'react-native';
import Deck from '../components/Deck';

export class Main extends Component {
  renderItem = ({ item }) => {
    return (
      <Deck
        title={item['title']}
        flashcardsCount={item['questions'].length}
      />
    );
  }

  render() {
    const { decks } = this.props;

    return (
      <View>
        <FlatList
          data={decks}
          renderItem={this.renderItem}
          keyExtractor={item => item['title']}
        />
      </View>
    );
  }
}

const mapStateToProps = ({ decks }) => ({ decks });

export default connect(mapStateToProps)(Main);
