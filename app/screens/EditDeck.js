import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Colors, Appbar } from 'react-native-paper';
import Container from '../components/Container';
import DeckForm from '../components/DeckForm';
import { editDeck } from '../actions';
import DialogWithLoadingIndicator from '../components/DialogWithLoadingIndicator';
import { waitFor } from '../lib/helpers';

export class EditDeck extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerRight:
        <Appbar.Action
          icon="done"
          color={Colors.white}
          onPress={() => navigation.getParam('submitForm')()}
        />
    };
  };

  state = {
    progressDialogVisible: false
  }

  componentDidMount() {
    this.props.navigation.setParams({ submitForm: this.submitForm });
  }

  handleSubmit = (values, actions) => {
    this.setState({ progressDialogVisible: true });
    return waitFor(1000).then(() => this.submitEditedDeck(values));
  }

  submitForm = () => this.form.submitForm();

  setFormRef = element => this.form = element;

  submitEditedDeck = values => {
    const { editDeck, navigation: { navigate } } = this.props;

    return editDeck(values)
      .then(() => this.setState({ progressDialogVisible: false }))
      .then(() => navigate('Main', { flashMessage: 'Deck has been successfully edited' }))
  }

  render() {
    const { deck } = this.props;
    const { progressDialogVisible } = this.state;

    return (
      <Container>
        <DeckForm
          initialValues={deck}
          formRef={this.setFormRef}
          handleSubmit={this.handleSubmit}
        />
        <DialogWithLoadingIndicator
          visible={progressDialogVisible}
          loadingMessage="Editing....."
        />
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

const mapDispatchToProps = dispatch => ({
  editDeck: data => dispatch(editDeck(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditDeck);
