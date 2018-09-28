import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FlatList, KeyboardAvoidingView } from 'react-native';
import { TextInput } from 'react-native-paper';
import Container from '../../components/Container';
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
          mode="outlined"
        />
        <TextInput
          label="Answer"
          value={item.answer}
          multiline
          editable={false}
          mode="outlined"
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
      <Container>
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
      </Container>
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
