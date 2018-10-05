import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, FlatList } from 'react-native';
import { Appbar, Colors } from 'react-native-paper';
import Deck from '../../components/Deck';
import ConfirmDialog from '../../components/ConfirmDialog';
import FAB from '../../components/FAB';
import Container from '../../components/Container';
import BottomRightContainer from '../../components/BottomRightContainer';
import { Movable, Fadable } from '../../components/Animations/index';
import Toaster from '../../components/Toaster';
import NoContent from './NoContent';
import SettingsDialog from './SettingsDialog';
import {
  fetchDecks,
  deleteDeck,
  loadSettings
} from '../../actions/index';
import {
  scheduleLocalNotification,
  clearLocalNotification
} from '../../lib/notifications';

export class Main extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerRight: (
        <Appbar.Action
          icon="settings"
          onPress={navigation.getParam('openSettingsDialog')}
          color={Colors.white}
        />
      )
    };
  };

  state = {
    dialogVisible: false,
    settingsDialogVisible: false,
    snackbarVisible: false,
    selectedDeck: {
      id: null,
      remove: false
    }
  }

  componentDidMount() {
    const { fetchDecks, navigation, loadSettings } = this.props;

    fetchDecks();
    loadSettings();

    navigation.setParams({ openSettingsDialog: this.openSettingsDialog });
  }

  componentDidUpdate(prevProps) {
    if (this.props.navigation !== prevProps.navigation) {
      const { navigation } = this.props;
      const flashMessage = navigation.getParam('flashMessage');

      if (flashMessage) {
        this.setState(
          { snackbarVisible: true },
          () => this.toaster.showMessage(flashMessage)
        );
      }
    }

    const { settings } = this.props;
    if (settings !== prevProps.settings) {
      settings.receiveNotifications ?
        scheduleLocalNotification() :
        clearLocalNotification()
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

  openSettingsDialog = () => this.setState({ settingsDialogVisible: true })
  closeSettingsDialog = () => this.setState({ settingsDialogVisible: false })

  addToasterRef = element => this.toaster = element;
  closeSnackbar = () => this.setState({ snackbarVisible: false });

  handleDeckDelete = id => {
    const { deleteDeck } = this.props;

    return deleteDeck(id)
      .then(() => {
        this.setState(
          { selectedDeck: { id: null, remove: false },
            snackbarVisible: true
          },
          () => this.toaster.showMessage('Deck has been successfully deleted')
        );
      });
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
          onPress={() => navigation.navigate('DeckDetail', { deckId: item.id })}
        />
      </Fadable>
    );
  }

  render() {
    const { decks, navigation } = this.props;
    const {
      dialogVisible,
      selectedDeck,
      snackbarVisible,
      settingsDialogVisible
    } = this.state;

    return (
      <View style={{flex: 1}}>
        <Container>
          <FlatList
            data={decks}
            extraData={selectedDeck.remove}
            renderItem={this.renderItem}
            keyExtractor={item => item.id}
            ListEmptyComponent={NoContent}
            contentContainerStyle={[
              { flexGrow: 1 },
              decks.length ? null : { justifyContent: 'center'}
            ]}
          />

          <BottomRightContainer right={16} bottom={16} >
            <Movable toValue={snackbarVisible ? -46 : 0} >
              <FAB handlePress={() => navigation.navigate('CreateDeck')} />
            </Movable>
          </BottomRightContainer>
          <ConfirmDialog
            visible={dialogVisible}
            handleDismiss={this.closeDialog}
            handleSubmitPress={this.submitDialog}
            title="Delete deck?"
            content="This deck and all it cards will be deleted. You can edit this deck if you want to change something."
            actionSubmitText="Delete"
          />
          <SettingsDialog
            visible={settingsDialogVisible}
            onDismiss={this.closeSettingsDialog}
          />
        </Container>
        <Toaster
          ref={this.addToasterRef}
          onDismissCallback={this.closeSnackbar}
        />
      </View>
   );
  }
}

const mapStateToProps = ({ decks, settings }) => (
  {
    decks: Object.values(decks),
    settings
  }
);

const mapDispatchToProps = dispatch => ({
  fetchDecks:     () =>       dispatch(fetchDecks()),
  deleteDeck:     id =>       dispatch(deleteDeck(id)),
  loadSettings:   () =>       dispatch(loadSettings())
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
