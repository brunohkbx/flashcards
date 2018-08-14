import React, { Component } from 'react';
import { connect } from 'react-redux'
import { View, FlatList } from 'react-native';
import Deck from '../components/Deck';
import FABContainer from '../components/FABContainer';
import FAB from '../components/FAB';
import DeckFormDialog from '../components/DeckFormDialog';
import { fetchDecks } from '../actions';

export class Main extends Component {
  state = {
    formVisible: false
  }

  componentDidMount() {
    const { fetchDecks } = this.props;

    fetchDecks();
  }

  renderItem = ({ item }) => {
    return (
      <Deck
        title={item['title']}
        flashcardsCount={item['questions'].length}
      />
    );
  }

  openForm = () => this.setState({ formVisible: true });
  closeForm = () => this.setState({ formVisible: false });

  render() {
    const {
      decks
    } = this.props;

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
          visible={this.state.formVisible}
          handleDismiss={() => this.closeForm()}
        />
      </View>
    );
  }
}

const mapStateToProps = ({ decks }) => ({ decks: Object.values(decks) });

const mapDispatchToProps = dispatch => ({
  fetchDecks: () => dispatch(fetchDecks())
})

export default connect(mapStateToProps, mapDispatchToProps)(Main);
