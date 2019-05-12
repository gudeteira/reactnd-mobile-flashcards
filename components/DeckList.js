import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {FlatList, Text} from 'react-native';
import {withNavigation} from 'react-navigation';
import {connect} from 'react-redux';
import {handleGetDecks} from '../actions';
import {Routes} from '../router/Routes';
import {Card} from './card';
import Container from './Container';


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
      return <Container><Text>No Decks</Text></Container>;
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

export default connect(mapStateToProps)(withNavigation(DeckList));