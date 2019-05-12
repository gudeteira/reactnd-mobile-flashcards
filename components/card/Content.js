import React, {PureComponent} from 'react';
import {StyleSheet, Text, View} from 'react-native';

class Content extends PureComponent {
  render() {
    const {questions, bestScore, lastScore} = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.cellContainer}>
          <Text style={styles.titleText}>Questions</Text>
          <Text style={styles.text}>{Object.keys(questions).length}</Text>
        </View>
        <View style={styles.cellContainer}>
          <Text style={styles.titleText}>Best score</Text>
          <Text style={styles.text}>{bestScore !== '' ? bestScore : 'N/A'}</Text>
        </View>
        <View style={styles.cellContainer}>
          <Text style={styles.titleText}>Last score</Text>
          <Text style={styles.text}>{lastScore !== '' ? lastScore : 'N/A'}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 56,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  titleText: {
    fontSize: 12,
    color: 'gray',
  },
  cellContainer: {
    flex: 1,
    alignItems: 'center'
  },
  text: {
    fontSize: 18,
    fontWeight: '900',
    // alignSelf: 'center'
  },
});

export default Content;
