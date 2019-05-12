import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {connect} from 'react-redux';
import {handleUpdateScore} from '../actions';
import {Routes} from '../router/Routes';
import {clearLocalNotification, setLocalNotification} from '../services/Notifications';
import Container from './Container';
import IconButton from './IconButton';
import PopUp from './PopUp';
import Toolbar from './Toolbar';


class Question extends Component {
  static propTypes = {
    deck: PropTypes.object.isRequired
  };
  state = {
    questionIndex: 0,
    showingAnswer: false,
    rightAnswers: [],
  };

  componentDidMount() {
    clearLocalNotification()
      .then(setLocalNotification);
  }

  toggle = () => {
    this.setState((state) => {
      return {
        ...state,
        showingAnswer: !state.showingAnswer
      };
    });
  };

  answer = (right) => {
    this.setState((state, props) => {
      if (right) {
        return {
          ...state,
          rightAnswers: state.rightAnswers.concat([this.getCurrentQuestion().id])
        };
      } else {
        return {
          ...state
        };
      }
    }, () => {
      const totalQuestions = this.props.deck.questions.length;
      if (this.state.questionIndex + 1 < totalQuestions) {
        this.setState((state) => {
          return {
            ...state,
            questionIndex: state.questionIndex + 1
          };
        });
      } else {
        const {rightAnswers} = this.state;
        const {deck} = this.props;
        const summary = {
          deckId: deck.id,
          total: totalQuestions,
          right: rightAnswers.length,
          incorrect: deck.questions.length - rightAnswers.length
        };
        this.props.navigation.navigate(Routes.QuizSummary, {summary: summary});
        this.props.dispatch(handleUpdateScore(this.props.deck, (summary.right * 100) / summary.total));
        this.setState(() => {
          return {
            questionIndex: 0,
            totalQuestions: 0,
            showingAnswer: false,
            rightAnswers: []
          };
        });
      }
    });
  };

  getCurrentQuestion = () => {
    return this.props.deck.questions[this.state.questionIndex];
  };

  renderAnswer = () => {
    const question = this.getCurrentQuestion();
    const {showingAnswer} = this.state;
    return (
      <PopUp isOpen={showingAnswer} onClose={this.toggle}>
        <View style={styles.questionContainer}>
          <Text style={styles.questionText}>
            {question.answer}
          </Text>
        </View>
      </PopUp>
    );
  };

  toolbarButtons = () => {
    return [
      <IconButton key={'show-answer'} onPress={this.toggle}>
        <Text>Show answer</Text>
      </IconButton>
    ];
  };

  render() {
    const totalQuestions = this.props.deck.questions.length;
    const currentQuestion = this.state.questionIndex + 1;
    const question = this.getCurrentQuestion();
    const answer = this.renderAnswer();
    return (
      <View style={{flex: 1}}>
        <Toolbar title={`Question ${currentQuestion} of ${totalQuestions}`} buttons={this.toolbarButtons()}/>

        <Container>
          <View style={styles.questionContainer}>
            <Text style={styles.questionText}>
              {question.question}
            </Text>
          </View>
          <View style={styles.buttonRow}>
            <IconButton style={[styles.buttonContainer, styles.buttonOk]} onPress={() => this.answer(true)}>
              <Text style={styles.button}>Ok</Text>
            </IconButton>
            <IconButton style={[styles.buttonContainer, styles.buttonKo]} onPress={() => this.answer(false)}>
              <Text style={styles.button}>KO</Text>
            </IconButton>
          </View>

        </Container>
        {
          answer
        }

      </View>
    );
  };
}

function mapStateToProps(state, {navigation}) {
  const {deck} = navigation.state.params;
  return {
    deck
  };
}

const styles = StyleSheet.create({

  buttonOk: {backgroundColor: 'green'},
  buttonKo: {backgroundColor: 'red'},
  buttonRowContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-evenly',
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    alignItems: 'center',
    backgroundColor: '#673AB7',
    borderRadius: 8,
    margin: 20,
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  button: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20
  },
  questionContainer: {
    flexDirection: 'row',
    padding: 20
  },
  questionText: {
    fontSize: 20,
  },
  itemContainer: {
    marginHorizontal: 16,
    marginVertical: 10,
  }
});

export default connect(mapStateToProps)(Question);