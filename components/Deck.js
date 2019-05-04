import React, {Component} from 'react';
import {FlatList, View} from 'react-native';
import {Avatar, FAB, IconButton, List} from 'react-native-paper';
import {connect} from 'react-redux';
import {removeDeck} from '../actions';
import {removeDeck as deleteDeck} from '../services/Api';
import {clearLocalNotification, setLocalNotification} from '../services/Notifications';
import {Colors, Theme} from '../theme/theme';


class Deck extends Component {
  // static navigationOptions = ({navigation}) => {
  //   const {entryId} = navigation.state.params;
  //
  //   const year = entryId.slice(0, 4);
  //   const month = entryId.slice(5, 7);
  //   const day = entryId.slice(8);
  //
  //   return {
  //     title: `${month}/${day}/${year}`
  //   };
  // };

  playQuiz = () => {
    console.log('play quiz');
    clearLocalNotification()
      .then(setLocalNotification);
  };

  addQuestion = () => {
    const {deck} = this.props;
    this.props.navigation.navigate('AddQuestion', {deckId: deck.id});
  };

  removeDeck = () => {
    const {deck} = this.props;
    this.props.dispatch(removeDeck(deck.id));
    this.props.navigation.goBack();
    deleteDeck(deck.id);

  };

  renderItem = ({item, index}) => {
    return <List.Item
      title={item.question}
      left={props => <Avatar.Text {...props} size={50} label={index + 1}/>}
    />;
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.deck !== undefined;
  }

  render() {
    const {deck} = this.props;
    return (
      <View style={[Theme.homeContainer]}>
        <IconButton size={20} icon="delete" onPress={this.removeDeck}/>
        <IconButton size={20} icon="play-arrow" onPress={this.playQuiz}/>
        <View>
          <FlatList
            data={deck.questions}
            keyExtractor={(item) => item.id}
            renderItem={this.renderItem}/>
        </View>

        <FAB style={Theme.fab} icon="add" color={Colors.text} onPress={this.addQuestion}/>
      </View>
    );
  }

//   static Header = (navigation) => {
//     const {deck} = props;
//     const disabledPlayQuiz = Object.keys(deck.questions).length < 1;
//     const goBack = () => {
//       navigation.goBack();
//     };
//     return (
//       <Appbar.Header>
//         <Appbar.BackAction onPress={goBack}/>
//         <Appbar.Content title={deck.name}/>
//         <Appbar.Action icon="play-arrow"
//                        disabled={disabledPlayQuiz}
//                        onPress={() => {
//                          console.log('play Deck:', deck);
//                        }}/>
//
//
//         <Appbar.Action icon="more-vert" onPress={() => {
//           console.log('more');
//         }}/>
//       </Appbar.Header>
//     );
//   };
}

function mapStateToProps(state, {navigation}) {
  const {deckId} = navigation.state.params;

  return {
    deckId,
    deck: state[deckId],
  };
}

export default connect(mapStateToProps)(Deck);