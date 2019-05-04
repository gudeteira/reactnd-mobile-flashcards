import React, {Component} from 'react';
import {View} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import {connect} from 'react-redux';
import {handleAddDeck} from '../actions';
import {Theme} from '../theme/theme';

class AddDeck extends Component {

  state = {
    name: '',
  };

  saveDeck = () => {
    const {name} = this.state;
    this.props.dispatch(handleAddDeck(name)).catch(e => console.error(e));
    this.setState({name: ''});
    this.props.navigation.goBack();
  };

  render() {
    return (
      <View style={Theme.homeContainer}>
        <TextInput
          type='flat'
          placeholder='Type the deck name'
          label='name'
          value={this.state.name}
          onChangeText={name => {
            this.setState({name});
          }}
        />
        <Button mode="contained" onPress={this.saveDeck}>
          Save
        </Button>
      </View>
    );
  }
}

export default connect()(AddDeck);