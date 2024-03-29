import React, {Component} from 'react';
import {Alert, FlatList, StyleSheet, Text, View} from 'react-native';
import {connect} from 'react-redux';
import {removeDeck, removeQuestion} from '../actions';
import {Routes} from '../router/Routes';
import {removeDeck as deleteDeck, removeQuestion as deleteQuestion} from '../services/Api';
import Container from './Container';
import IconButton from './IconButton';
import Score from './Score';
import Toolbar from './Toolbar';

class Deck extends Component {

  playQuiz = () => {
    const {deck} = this.props;
    if (deck.questions.length === 0) {
      this.showAlert();
    } else {
      this.props.navigation.navigate(Routes.Question, {deck});
    }
  };

  showAlert = () => {
    Alert.alert(
      'No questions available',
      'Please create a question to start quiz',
      [
        {text: 'OK'},
      ],
    );
  };
  addQuestion = () => {
    const {deck} = this.props;
    this.props.navigation.navigate(Routes.AddQuestion, {deckId: deck.id});
  };

  removeDeck = () => {
    const {deck} = this.props;
    this.props.dispatch(removeDeck(deck.id));
    this.back();
    deleteDeck(deck.id);
  };

  removeQuestion = index => {
    const {deck} = this.props;
    const question = deck.questions[index];
    this.props.dispatch(removeQuestion(deck.id, question.id));
    deleteQuestion(question, deck);
  };

  back = () => {
    this.props.navigation.navigate(Routes.Home);
  };

  renderItem = ({item, index}) => {
    return (
      <View style={styles.itemContainer}>
        <View style={styles.rowContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>{item.question}</Text>
          </View>
          <View>
            <IconButton name='trash-2' color='#000'
                        style={styles.icon}
                        onPress={() => this.removeQuestion(index)}/>
          </View>
        </View>
      </View>
    );
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.deck !== undefined;
  }

  toolbarButtons = () => {
    return [
      <IconButton key={'play'}
                  name='play'
                  style={styles.icon}
                  onPress={this.playQuiz}/>,
      <IconButton key={'remove'}
                  name='trash-2'
                  style={styles.icon}
                  onPress={this.removeDeck}/>
    ];
  };

  render() {
    const {deck} = this.props;
    return (
      <View style={{flex: 1}}>
        <Toolbar title={deck.name} back={this.back} buttons={this.toolbarButtons()}/>
        <Container>
          <View style={styles.scoresContainer}>
            <Score title='Best score' score={deck.bestScore}/>
            <Score title='Last score' score={deck.lastScore}/>
          </View>

          <FlatList
            data={deck.questions}
            keyExtractor={(item) => item.id}
            renderItem={this.renderItem}/>
        </Container>
        <IconButton style={styles.fabIcon} name="plus" size={30} color="white" onPress={this.addQuestion}/>
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

const styles = StyleSheet.create({
  itemContainer: {
    marginHorizontal: 16,
    marginVertical: 10,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleContainer: {
    flex: 1,
  },
  titleText: {
    fontSize: 18,
  },
  scoresContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'flex-start',
    justifyContent: 'space-evenly',
    borderRadius: 8,
    paddingVertical: 22
  },
  fabIcon: {
    width: 55,
    height: 55,
    backgroundColor: '#1976d2',
    borderRadius: 50,
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    zIndex: 100,
    elevation: 2,
  },
  icon: {
    borderWidth: 0,
    borderColor: 'transparent',
    width: 40,
    height: 40,
    backgroundColor: 'transparent',
    borderRadius: 50,
  },
});


export default connect(mapStateToProps)(Deck);