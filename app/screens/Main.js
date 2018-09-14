import React, { Component } from 'react';
import { connect } from 'react-redux'
import { View, FlatList } from 'react-native';
import Deck from '../components/Deck';
import ConfirmDialog from '../components/ConfirmDialog';
import MainToolbar from '../components/MainToolbar';
import { fetchDecks, deleteDeck } from '../actions';
import { Snackbar } from 'react-native-paper';
import BottomFAB from '../components/BottomFAB';
import { Movable } from '../components/Animations';

export class Main extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: <MainToolbar
                handleSearchPress={() => navigation.navigate('DeckSearch')}
              />
    };
  };

  state = {
    confirmRemoveDialogVisible: false,
    currentDeck: null,
    snackBarVisible: false,
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

  openConfirmRemoveDialog = deckId => this.setState({ confirmRemoveDialogVisible: true, currentDeck: deckId });
  closeConfirmRemoveDialog = () => this.setState({ confirmRemoveDialogVisible: false, currentDeck: null });
  closeSnackBar = () => this.setState({ snackBarVisible: false });

  onRemoveDeckDialogConfirm = () => {
    const { deleteDeck } = this.props;
    const { currentDeck } = this.state;

    this.closeConfirmRemoveDialog();
    deleteDeck(currentDeck);
    this.props.navigation.setParams(
      { flashMessage: 'Deck has been successfully deleted' }
    );
  };

  renderItem = ({ item }) => {
    return (
      <Deck
        title={item.title}
        flashcardsCount={item.questions.length}
        handleEditPress={
          () => this.props.navigation.navigate('EditDeck', { deckId: item.id })
        }
        handleDeletePress={() => this.openConfirmRemoveDialog(item.id)}
      />
    );
  }

  render() {
    const { decks, navigation } = this.props;

    const { confirmRemoveDialogVisible, snackBarVisible } = this.state;
    const flashMessage = navigation.getParam('flashMessage');

    return (
      <View style={{flex: 1}}>
        <FlatList
          data={decks}
          renderItem={this.renderItem}
          keyExtractor={item => item.id}
        />

        <Movable
          toValue={snackBarVisible ? -46 : 0}
          move={snackBarVisible}
          style={{ flex: 1 }}
        >
          <BottomFAB handlePress={() => navigation.navigate('CreateDeck')}
          />
        </Movable>

        <Snackbar
          visible={snackBarVisible}
          onDismiss={() => this.closeSnackBar()}
        >
          {flashMessage}
        </Snackbar>
        <ConfirmDialog
          visible={confirmRemoveDialogVisible}
          handleDismiss={() => this.closeConfirmRemoveDialog()}
          handleSubmitPress={() => this.onRemoveDeckDialogConfirm()}
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
