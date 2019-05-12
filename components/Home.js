import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {connect} from 'react-redux';
import {Routes} from '../router/Routes';
import DeckList from './DeckList';
import IconButton from './IconButton';
import Toolbar from './Toolbar';

class Home extends Component {

  addDeck = () => {
    this.props.navigation.navigate(Routes.AddDeck);
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <Toolbar title='My Flashcards'/>
        <DeckList/>
        <IconButton style={styles.icon} name="add" size={30} color="white" onPress={this.addDeck}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({

  icon: {
    width: 55,
    height: 55,
    backgroundColor: '#673AB7',
    borderRadius: 50,
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default connect()(Home);