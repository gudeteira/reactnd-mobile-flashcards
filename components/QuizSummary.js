import React, {PureComponent} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {connect} from 'react-redux';
import {Routes} from '../router/Routes';
import Container from './Container';
import IconButton from './IconButton';
import Score from './Score';
import Toolbar from './Toolbar';

class QuizSummary extends PureComponent {


  render() {
    const {summary} = this.props.navigation.state.params;
    return (
      <View style={{flex: 1}}>
        <Toolbar title={'Quiz summary'}/>
        <Container>
          <View style={styles.scoresContainer}>
            <Score title='Questions' score={summary.total} color='blue'/>
            <Score title='Right' score={summary.right} color='green'/>
            <Score title='Incorrect' score={summary.incorrect} color='red'/>
          </View>
          <View style={styles.buttonRow}>
            <IconButton style={styles.buttonContainer}
                        onPress={() => this.props.navigation.navigate(Routes.Question, {deck: this.props.deck})}>
              <Text style={styles.button}>Restart quiz</Text>
            </IconButton>
            <IconButton style={styles.buttonContainer}
                        onPress={() => this.props.navigation.navigate(Routes.Deck, {deckId: summary.deckId})}>
              <Text style={styles.button}>Go back</Text>
            </IconButton>
          </View>
        </Container>
      </View>
    );
  }
}

function mapStateToProps(state, {navigation}) {
  const {deckId} = navigation.state.params.summary;

  return {
    deckId,
    deck: state[deckId],
  };
}

const styles = StyleSheet.create({
  scoresContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'flex-start',
    justifyContent: 'space-evenly',
    paddingVertical: 22,
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    alignItems: 'center',
    backgroundColor: '#1976d2',
    borderRadius: 8,
    margin: 20,
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  button: {
    color: '#FFFFFF',
    fontSize: 18,
  },

});

export default connect(mapStateToProps)(QuizSummary);