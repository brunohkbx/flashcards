import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, FlatList } from 'react-native';
import Deck from '../components/Deck';
import ConfirmDialog from '../components/ConfirmDialog';
import MainToolbar from '../components/MainToolbar';
import { fetchDecks, deleteDeck } from '../actions';
import { Snackbar } from 'react-native-paper';
import FAB from '../components/FAB';
import BottomRightContainer from '../components/BottomRightContainer';
import { Movable, Fadable } from '../components/Animations';

export class Main extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: <MainToolbar
                handleSearchPress={() => navigation.navigate('DeckSearch')}
              />
    };
  };

  state = {
    dialogVisible: false,
    snackBarVisible: false,
    selectedDeck: {
      id: null,
      remove: false
    }
  }

  componentDidMount() {
    const { fetchDecks } = this.props;

    fetchDecks();
  }

  componentDidUpdate(prevProps) {
    if (this.props.navigation !== prevProps.navigation) {
      const { navigation } = this.props;
      const flashMessage = navigation.getParam('flashMessage');

      if (flashMessage)
        this.setState({ snackBarVisible: true });
    }
  }

  openDialog = deckId => {
    const selectedDeck = { ...this.state.selectedDeck, ['id']: deckId };

    this.setState({ dialogVisible: true, selectedDeck });
  }

  closeDialog = () => {
    const selectedDeck = { ...this.state.selectedDeck, ['id']: null };

    this.setState({ dialogVisible: false, selectedDeck });
  }

  submitDialog = () => {
    const selectedDeck = {...this.state.selectedDeck, ['remove']: true};

    this.setState({ dialogVisible: false, selectedDeck });
  }

  closeSnackBar = () => this.setState({ snackBarVisible: false });

  handleDeckDelete = id => {
    const { deleteDeck, navigation } = this.props;

    return deleteDeck(id)
      .then(() => this.setState({ selectedDeck: { id: null, remove: false }}))
      .then(() => navigation.setParams(
        { flashMessage: 'Deck has been successfully deleted' }
      )
    );
  }

  renderItem = ({ item }) => {
    const { navigation } = this.props;
    const { selectedDeck: { id, remove }} = this.state;

    return (
      <Fadable
        fade={remove && item.id === id}
        onAnimationEnd={() => this.handleDeckDelete(item.id)}
      >
        <Deck
          title={item.title}
          flashcardsCount={item.questions.length}
          handleEditPress={
            () => navigation.navigate('EditDeck', { deckId: item.id })
          }
          handleDeletePress={() => this.openDialog(item.id)}
        />
      </Fadable>
    );
  }

  render() {
    const { decks, navigation } = this.props;

    const { dialogVisible, snackBarVisible, selectedDeck } = this.state;
    const flashMessage = navigation.getParam('flashMessage');

    return (
      <View style={{flex: 1}}>
        <FlatList
          data={decks}
          extraData={selectedDeck.remove}
          renderItem={this.renderItem}
          keyExtractor={item => item.id}
        />

        <BottomRightContainer right={16} bottom={16} >
          <Movable toValue={snackBarVisible ? -46 : 0} >
            <FAB handlePress={() => navigation.navigate('CreateDeck')} />
          </Movable>
        </BottomRightContainer>

        <Snackbar
          visible={snackBarVisible}
          onDismiss={() => this.closeSnackBar()}
        >
          {flashMessage}
        </Snackbar>
        <ConfirmDialog
          visible={dialogVisible}
          handleDismiss={this.closeDialog}
          handleSubmitPress={this.submitDialog}
          title="Delete deck?"
          content="This deck and all it cards will be deleted. You can edit this deck if you want to change something."
          actionSubmitText="Delete"
        />
      </View>
    );
  }
}

const mapStateToProps = ({ decks }) => ({ decks: Object.values(decks) });

const mapDispatchToProps = dispatch => ({
  fetchDecks: () => dispatch(fetchDecks()),
  deleteDeck: id => dispatch(deleteDeck(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Main);
