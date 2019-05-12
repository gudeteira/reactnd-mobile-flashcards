import PropTypes from 'prop-types';
import React, {PureComponent} from 'react';
import {StyleSheet, Text, View,} from 'react-native';

class Score extends PureComponent {
  static propTypes = {
    title: PropTypes.string.isRequired,
    score: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    color: PropTypes.string,
  };

  getColor = () => {
    if (this.props.color) {
      return this.props.color;
    }
    let color = 'black';
    const {score} = this.props;
    if (typeof score === 'number') {
      if (score < 50) {
        color = 'red';
      } else if (score < 60) {
        color = 'orange';
      } else {
        color = 'green';
      }
    }
    return color;
  };

  render() {
    const {title, score} = this.props;
    const color = this.getColor();

    return (
      <View style={styles.container}>
        <View style={[styles.score, {borderColor: color, color: color}]}>
          <Text style={[styles.text, {color: color}]}>
            {typeof score === 'number' ? score : 'N/A'}
          </Text>
        </View>
        <View style={styles.title}>
          <Text style={styles.titleText}>{title}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  score: {
    borderWidth: 2,
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    backgroundColor: 'transparent',
    borderRadius: 50,
    alignSelf: 'center'
  },
  title: {
    alignItems: 'center',
    justifyContent: 'center',

  },
  titleText: {
    color: 'gray'
  },
  text: {
    fontSize: 20,
    fontWeight: '900',
  },

});

export default Score;
