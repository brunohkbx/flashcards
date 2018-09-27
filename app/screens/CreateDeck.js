import React, { Component } from 'react';
import { connect } from 'react-redux';
import Container from '../components/Container';
import DeckForm from '../components/DeckForm';
import { createDeck } from '../actions';
import { Colors, Appbar } from 'react-native-paper';
import uuid from 'uuid';

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

  componentDidMount() {
    this.props.navigation.setParams({ submitForm: this.submitForm });
  }

  handleSubmit = (values, actions) => {
    const { createDeck, navigation } = this.props;

    createDeck(values);
    actions.setSubmitting(false);
    navigation.navigate(
      'Main',
      { flashMessage: 'Deck has been successfully created' }
    );
  }

  submitForm = () => this.form.submitForm();

  setFormRef = element => this.form = element;

  render() {
    return (
      <Container>
        <DeckForm
          initialValues={{ title: '', questions: [], id: uuid() }}
          formRef={this.setFormRef}
          handleSubmit={this.handleSubmit}
        />
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  createDeck: data => dispatch(createDeck(data))
});

export default connect(null, mapDispatchToProps)(CreateDeck);
