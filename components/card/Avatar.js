import React, {PureComponent} from 'react';
import {StyleSheet, Text, View} from 'react-native';

class Avatar extends PureComponent {
  render() {
    const {text} = this.props;
    return (
      <View style={styles.container}>
        <Text style={{color: 'white',}}>{text}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    backgroundColor: '#ccabd8'// d0e6a5, ffdd94, fa897b, ccabd8
  },
});

export default Avatar;
