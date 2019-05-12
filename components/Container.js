import React, { PureComponent } from 'react';
import { View,  StyleSheet } from 'react-native';

class Container extends PureComponent {
  render() {
    const { style, children } = this.props;
    return <View style={[styles.container, style]}>{children}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
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
  }
});

export default Container;
