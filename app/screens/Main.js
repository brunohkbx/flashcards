import React, { Component } from 'react';
import { connect } from 'react-redux'
import { View, FlatList } from 'react-native';
import Deck from '../components/Deck';
import FABContainer from '../components/FABContainer';
import FAB from '../components/FAB';
import DeckFormDialog from '../components/DeckFormDialog';
import ConfirmDialog from '../components/ConfirmDialog';
import {
  fetchDecks,
  deleteDeck,
  createDeck,
  editDeck
} from '../actions';

export class Main extends Component {
  state = {
    formVisible: false,
    confirmRemoveDialogVisible: false,
    currentDeck: null
  }

  componentDidMount() {
    const { fetchDecks } = this.props;

    fetchDecks();
  }

  openForm = () => this.setState({ formVisible: true });
  openEditForm = deckId => this.setState({ formVisible: true, currentDeck: deckId });
  closeForm = () => this.setState({ formVisible: false, currentDeck: null });
  openConfirmRemoveDialog = deckId => this.setState({ confirmRemoveDialogVisible: true, currentDeck: deckId });
  closeConfirmRemoveDialog = () => this.setState({ confirmRemoveDialogVisible: false, currentDeck: null });

  submitForm = (values, actions) => this.setState(
    { formVisible: false },
    () => {
      const { currentDeck } = this.state;
      const { createDeck, editDeck } = this.props;

      currentDeck ? editDeck(values) : createDeck(values);
      actions.resetForm();
      actions.setSubmitting(false);
    });

  renderItem = ({ item }) => {
    return (
      <Deck
        title={item.title}
        flashcardsCount={item.questions.length}
        handleEditPress={() => this.openEditForm(item.id)}
        handleDeletePress={() => this.openConfirmRemoveDialog(item.id)}
      />
    );
  }

  render() {
    const {
      decks,
      deleteDeck
    } = this.props;

    const {
      confirmRemoveDialogVisible,
      formVisible,
      currentDeck
    } = this.state;

    return (
      <View style={{flex: 1}}>
        <FlatList
          data={decks}
          renderItem={this.renderItem}
          keyExtractor={item => item.id}
        />
        <FABContainer>
          <FAB handlePress={() => this.openForm()} />
        </FABContainer>
        <DeckFormDialog
          visible={formVisible}
          deck={decks.find(deck => deck.id === currentDeck) || {}}
          handleDismiss={() => this.closeForm()}
          handleSubmit={this.submitForm}
          title={currentDeck ? 'Edit Deck' : 'Create New Deck'}
          actionSubmitText={currentDeck ? 'Edit' : 'Create'}
        />
        <ConfirmDialog
          visible={confirmRemoveDialogVisible}
          handleDismiss={() => this.closeConfirmRemoveDialog()}
          handleSubmitPress={() => {this.closeConfirmRemoveDialog(); deleteDeck(currentDeck);}}
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
  createDeck: data => dispatch(createDeck(data)),
  editDeck: data => dispatch(editDeck(data)),
  fetchDecks: () => dispatch(fetchDecks()),
  deleteDeck: id => dispatch(deleteDeck(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Main);
