import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, FlatList, KeyboardAvoidingView } from 'react-native';
import { TextInput } from 'react-native-paper';
import ScreenToolbar from './ScreenToolbar';
import Flashcard from '../../components/Flashcard';
import { FlashcardIcon } from '../../components/Icons';
import NoContent from './NoContent';
import { Header } from 'react-navigation';

export class DeckDetail extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: <ScreenToolbar
                navigation={navigation}
                onDelete={navigation.getParam('openDialog')}
              />
    };
  };

  renderIcon = ({size, color}) => <FlashcardIcon size={size} color={color} />

  renderItem = ({ item }) => {
    return (
      <Flashcard>
        <TextInput
          label="Question"
          value={item.question}
          multiline
          editable={false}
        />
        <TextInput
          label="Answer"
          value={item.answer}
          multiline
          editable={false}
        />
      </Flashcard>
    );
  }

  componentDidMount() {
    const { navigation } = this.props;

    navigation.setParams({ openDialog: this.openDialog });
  }

  render() {
    const { deck } = this.props;

    return (
      <View style={{ flex: 1}}>
        <KeyboardAvoidingView
          style={{flex: 1}}
          behavior="padding"
          enabled
          keyboardVerticalOffset={Header.HEIGHT + 30}
        >
        {deck.questions.length > 0 ?
          <FlatList
            data={deck.questions}
            renderItem={this.renderItem}
            keyExtractor={item => item.id}
          />
          :
          <NoContent/>
        }
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const mapStateToProps = ({ decks }, { navigation }) => {
  const { deckId } = navigation.state.params;

  return {
    deck: decks[deckId]
  };
};

export default connect(mapStateToProps)(DeckDetail);
