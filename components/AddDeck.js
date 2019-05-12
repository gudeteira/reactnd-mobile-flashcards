import React, {Component} from 'react';
import {KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableHighlight, View} from 'react-native';
import {connect} from 'react-redux';
import {addDeck} from '../actions';
import {Routes} from '../router/Routes';
import {saveDeck} from '../services/Api';
import Container from './Container';
import Toolbar from './Toolbar';

class AddDeck extends Component {

  state = {
    name: '',
  };

  saveDeck = () => {
    const {name} = this.state;
    saveDeck(name).then(deck => {
      this.props.dispatch(addDeck(deck));
      this.props.navigation.navigate(Routes.Deck, {deckId: deck.id});
    });
    this.setState({name: ''});
  };


  back = () => {
    this.props.navigation.goBack();
  };

  render() {
    return (
      <KeyboardAvoidingView style={{flex: 1,}} behavior="padding">
        <Toolbar title={'New Deck'} back={this.back}/>
        <Container>
          <View style={{flex: 1}}>
            <TextInput
              autofocus={true}
              placeholder='Name'
              style={styles.inputForm}
              value={this.state.name}
              onChangeText={name => {
                this.setState({name});
              }}
            />
          </View>
          <View style={styles.footer}>
            <TouchableHighlight
              underlayColor="#9575CD"
              style={styles.buttonContainer}
              onPress={this.saveDeck}>
              <Text style={styles.button}>Save</Text>
            </TouchableHighlight>
          </View>
        </Container>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  inputForm: {
    color: '#BBBBBB',
    fontSize: 20,
    borderColor: 'transparent',
    borderWidth: 0
  },
  footer: {
    padding: 20,
  },
  buttonContainer: {
    backgroundColor: '#1976d2',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  button: {
    color: '#fff',
    fontSize: 18,
  },
});

export default connect()(AddDeck);