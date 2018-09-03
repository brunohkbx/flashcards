import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import DeckForm from '../components/DeckForm';
import { createDeck } from '../actions';
import { Colors, ToolbarAction } from 'react-native-paper';

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
    const { createDeck } = this.props;

    createDeck(values);
    actions.setSubmitting(false);
  }

  submitForm = () => this.form.submitForm();

  render() {
    return (
      <View style={{flex: 1, padding: 8}}>
        <DeckForm
          formRef={node => this.form = node}
          handleSubmit={this.handleSubmit}
          title="Create New Deck"
          actionSubmitText="Create"
        />
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  createDeck: data => dispatch(createDeck(data))
});

export default connect(null, mapDispatchToProps)(CreateDeck);
