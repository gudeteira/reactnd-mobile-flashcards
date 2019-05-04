import React, {Component} from 'react';
import {View} from 'react-native';
import {FAB} from 'react-native-paper';
import {connect} from 'react-redux';
import {Colors, Theme} from '../theme/theme';
import DeckList from './DeckList';

class Home extends Component {

  addDeck = () => {
    this.props.navigation.navigate('AddDeck')
  };

  render() {
    return (
      <View style={Theme.homeContainer}>
        <DeckList/>
        <FAB style={Theme.fab} icon="add" color={Colors.text} onPress={this.addDeck}/>
      </View>
    );
  }
}

export default connect()(Home);