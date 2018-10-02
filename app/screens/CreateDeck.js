import React, { Component } from 'react';
import { connect } from 'react-redux';
import Container from '../components/Container';
import DeckForm from '../components/DeckForm';
import { createDeck } from '../actions';
import { Colors, Appbar } from 'react-native-paper';
import uuid from 'uuid';
import DialogWithLoadingIndicator from '../components/DialogWithLoadingIndicator';
import { waitFor } from '../lib/helpers';

export class CreateDeck extends Component {
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
    return waitFor(1000).then(() => this.submitCreatedDeck(values));
  }

  submitForm = () => this.form.submitForm();

  setFormRef = element => this.form = element;

  submitCreatedDeck = values => {
    const { createDeck, navigation: { navigate } } = this.props;

    return createDeck(values)
      .then(() => this.setState({ progressDialogVisible: false }))
      .then(() => navigate('Main', { flashMessage: 'Deck has been successfully created' }))
  }

  render() {
    const { progressDialogVisible } = this.state;

    return (
      <Container>
        <DeckForm
          initialValues={{ title: '', questions: [], id: uuid() }}
          formRef={this.setFormRef}
          handleSubmit={this.handleSubmit}
        />
        <DialogWithLoadingIndicator
          visible={progressDialogVisible}
          loadingMessage="Creating....."
        />
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  createDeck: data => dispatch(createDeck(data))
});

export default connect(null, mapDispatchToProps)(CreateDeck);
