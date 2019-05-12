import {MaterialIcons} from '@expo/vector-icons';
import React, {PureComponent} from 'react';
import {StyleSheet,View} from 'react-native';
import {Routes} from '../router/Routes';
import Container from './Container';
import IconButton from './IconButton';
import Score from './Score';
import Toolbar from './Toolbar';

class QuizSummary extends PureComponent {

  toolbarButtons = () => {
    return [
      <IconButton key={'show-answer'} onPress={() => this.props.navigation.navigate(Routes.Home)}>
        <MaterialIcons
          name="close"
          size={30} color="#008dff"/>
      </IconButton>
    ];
  };

  render() {
    const {summary} = this.props.navigation.state.params;
    return (
      <View style={{flex:1}}>
        <Toolbar title={'Summary'} buttons={this.toolbarButtons()}/>
        <Container>
          <View style={styles.scoresContainer}>
            <Score title='Questions' score={summary.total} color='blue'/>
            <Score title='Right' score={summary.right} color='green'/>
            <Score title='Incorrect' score={summary.incorrect} color='red'/>
          </View>
        </Container>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding:20,
    backgroundColor: 'white',
    marginHorizontal: 16,
    marginVertical: 4,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 2,
    shadowOffset: {
      height: 2,
      width: 0,
    }
  },
  scoresContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'flex-start',
    justifyContent: 'space-evenly',
    paddingVertical: 22,
  }
});

export default QuizSummary;