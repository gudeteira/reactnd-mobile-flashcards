import React, {Component} from 'react';
import {View} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import {connect} from 'react-redux';
import {handleAddQuestion} from '../actions/index';
import {Theme} from '../theme/theme';

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
    this.props.navigation.goBack();
  };

  render() {
    return (

      <View style={Theme.homeContainer}>
        <TextInput
          type='flat'
          placeholder='Type the question'
          label='Question'
          value={this.state.question}
          onChangeText={question => {
            this.setState({question});
          }}
        />
        <TextInput
          type='flat'
          placeholder='Type the answer'
          label='Answer'
          multiline={true}
          numberOfLines={4}
          value={this.state.answer}
          onChangeText={answer => {
            this.setState({answer});
          }}
        />
        <Button mode="contained" onPress={this.saveQuestion}>
          Save
        </Button>
      </View>
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

export default connect(mapStateToProps)(AddQuestion);