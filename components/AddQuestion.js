import React, {Component} from 'react';
import {KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableHighlight, View} from 'react-native';
import {connect} from 'react-redux';
import {handleAddQuestion} from '../actions/index';
import Container from './Container';
import Toolbar from './Toolbar';

class AddQuestion extends Component {
  state = {
    question: '',
    answer: ''
  };
  saveQuestion = () => {
    const {deck} = this.props;
    this.props.dispatch(handleAddQuestion(this.state, deck));
    this.setState({
      question: '',
      answer: ''
    });
    this.back();
  };

  back = () => {
    this.props.navigation.goBack();
  };

  render() {
    return (
      <KeyboardAvoidingView style={{flex: 1,}} behavior="padding">
        <Toolbar title={'New Question'} back={this.back}/>
        <Container>
          <View style={{flex: 1}}>
            <TextInput
              autofocus={true}
              style={styles.inputForm}
              placeholder='Question'
              value={this.state.question}
              onChangeText={question => {
                this.setState({question});
              }}
            />
            <TextInput
              style={styles.inputForm}
              placeholder='Answer'
              multiline={true}
              numberOfLines={4}
              value={this.state.answer}
              onChangeText={answer => {
                this.setState({answer});
              }}
            />
          </View>
          <View style={styles.footer}>
            <TouchableHighlight
              underlayColor="#9575CD"
              style={styles.buttonContainer}
              onPress={this.saveQuestion}>
              <Text style={styles.button}>Save</Text>
            </TouchableHighlight>
          </View>
        </Container>
      </KeyboardAvoidingView>
    );
  }
}

function mapStateToProps(state, {navigation}) {
  const {deckId} = navigation.state.params;
  return {
    deckId,
    deck: state[deckId],
  };
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
    backgroundColor: '#673AB7',
    borderRadius: 100,
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  button: {
    color: '#000',
    fontSize: 18,
  },
});

export default connect(mapStateToProps)(AddQuestion);