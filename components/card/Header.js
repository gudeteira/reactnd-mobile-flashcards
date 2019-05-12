import React, {PureComponent} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Avatar from './Avatar';

class Header extends PureComponent {
  render() {
    const {name} = this.props;
    return (
      <View style={styles.container}>
        <Avatar text={name.substring(0, 2)}/>
        <View style={styles.nameContainer}>
          <Text>{name}</Text>
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
  },
  nameContainer: {
    flex: 1,
    marginLeft: 16,
  },
  rightContainer: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Header;
