import {Feather} from '@expo/vector-icons';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {withNavigation} from 'react-navigation';
import {connect} from 'react-redux';
import {handleGetDecks} from '../actions';
import {Routes} from '../router/Routes';
import {Card} from './card';


class DeckList extends Component {
  static propTypes = {
    decks: PropTypes.any
  };

  componentDidMount() {
    this.props.dispatch(handleGetDecks());
  }

  renderItem = ({item}) => {
    const {navigation} = this.props;
    return <Card item={this.props.decks[item]} onPress={() => navigation.navigate(Routes.Deck, {deckId: item})}/>;
  };

  render() {
    const {decks} = this.props;
    if (Object.keys(decks).length === 0) {
      return <View style={styles.empty}>
        <View style={styles.icon}>
          <Feather name='book-open' size={150} color='grey'/>
        </View>
        <Text>No Decks</Text>
      </View>;
    }
    return (
      <FlatList
        data={Object.keys(decks)}
        keyExtractor={(item) => item}
        renderItem={this.renderItem}/>
    );
  }
}

function mapStateToProps(decks = {}) {
  return {
    decks
  };
}

const styles = StyleSheet.create({
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    opacity: 0.2
  }

});

export default connect(mapStateToProps)(withNavigation(DeckList));