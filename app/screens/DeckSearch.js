import React, { Component } from 'react';
import { EvilIcons } from '@expo/vector-icons';
import { View, KeyboardAvoidingView } from 'react-native';
import { Paragraph } from 'react-native-paper';
import SearchToolbar from '../components/SearchToolbar';

class DeckSearch extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: <SearchToolbar
                handleChangeText={navigation.getParam('handleChangeText')}
                value={navigation.getParam('query')}
                handleIconPress={() => navigation.goBack()}
              />
    };
  };

  state = { query: '' }

  componentDidMount() {
    const { navigation }  = this.props;

    navigation.setParams({ handleChangeText: this.onChangeText });
  }

  onChangeText = query => {
    const { navigation } = this.props;

    this.setState({ query });
    navigation.setParams({ query });
  }

  render() {
    return (
      <KeyboardAvoidingView
        style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
        behavior="padding"
      >
        <View style={{alignItems: 'center'}}>
          <EvilIcons name="search" size={125} />
          <Paragraph>Enter a title and find your favorite deck</Paragraph>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

export default DeckSearch;
