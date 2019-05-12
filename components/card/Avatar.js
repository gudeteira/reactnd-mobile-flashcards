import React, {PureComponent} from 'react';
import {StyleSheet, Text, View} from 'react-native';

class Avatar extends PureComponent {
  render() {
    const {text} = this.props;
    return (
      <View style={[styles.container, {backgroundColor: this.backGroundColor()}]}>
        <Text style={{color: 'white',}}>{text ? text.toUpperCase() : text}</Text>
      </View>
    );
  }

  backGroundColor = () => {
    const index = Math.floor((Math.random() * bgColors.length - 1) + 1);
    return bgColors[index];
  };
}

const bgColors = ['#ccabd8', '#d0e6a5', '#ffdd94', '#fa897b', '#ccabd8', '#FEA735', '#00C3FF',];
const styles = StyleSheet.create({
  container: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    backgroundColor: '#ccabd8'
  },
});

export default Avatar;
