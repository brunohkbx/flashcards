import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import DeckForm from '../components/DeckForm';
import { editDeck } from '../actions';
import { Colors, ToolbarAction } from 'react-native-paper';

export class EditDeck extends Component {
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
    const { editDeck, navigation } = this.props;

    editDeck(values);
    actions.setSubmitting(false);
    navigation.navigate(
      'Main',
      { flashMessage: 'Deck has been successfully edited' }
    );
  }

  submitForm = () => this.form.submitForm();

  render() {
    const { deck } = this.props;

    return (
      <View style={{flex: 1, padding: 8}}>
        <DeckForm
          initialValues={deck}
          formRef={node => this.form = node}
          handleSubmit={this.handleSubmit}
        />
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

const mapDispatchToProps = dispatch => ({
  editDeck: data => dispatch(editDeck(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditDeck);
