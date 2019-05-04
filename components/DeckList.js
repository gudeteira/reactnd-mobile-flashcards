import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {FlatList} from 'react-native';
import {connect} from 'react-redux';
import {handleGetDecks} from '../actions';
import DeckItem from './DeckItem';


class DeckList extends Component {
  static propTypes = {
    decks: PropTypes.any
  };

  componentDidMount() {
    this.props.dispatch(handleGetDecks());
  }

  renderItem = ({item}) => {
    return <DeckItem deck={this.props.decks[item]}/>;
  };

  render() {
    return (
      <FlatList
        data={Object.keys(this.props.decks)}
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

export default connect(mapStateToProps)(DeckList);