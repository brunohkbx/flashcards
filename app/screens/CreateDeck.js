import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import DeckForm from '../components/DeckForm';
import { createDeck } from '../actions';
import { Colors, ToolbarAction } from 'react-native-paper';
import uuid from 'uuid';

export class CreateDeck extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerRight:
        <ToolbarAction
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
      <View style={{flex: 1, padding: 8}}>
        <DeckForm
          initialValues={{ title: '', questions: [], id: uuid() }}
          formRef={this.setFormRef}
          handleSubmit={this.handleSubmit}
        />
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  createDeck: data => dispatch(createDeck(data))
});

export default connect(null, mapDispatchToProps)(CreateDeck);
