import PropTypes from 'prop-types';
import React, {PureComponent} from 'react';
import {StyleSheet, Text, View,} from 'react-native';
import IconButton from './IconButton';

class Toolbar extends PureComponent {
  static propTypes = {
    title: PropTypes.string.isRequired,
    back: PropTypes.func,
    buttons: PropTypes.array
  };

  render() {
    const {title, buttons, back} = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.toolbarBackground}/>
        <View>
          <View style={styles.toolbarContainer}>
            <View>
              {
                back && <IconButton name={'chevron-left'} size={30} onPress={back}/>
              }
            </View>
            <View style={styles.titleContainer}>
              <Text style={styles.titleText}>{title}</Text>
            </View>
            {buttons}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {},

  toolbarContainer: {
    flexDirection: 'row',
    height: 56,
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  titleContainer: {
    flex: 1,
  },
  toolbarBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 120,
    backgroundColor: '#1976d2',
  },
  titleText: {
    fontSize: 24,
    fontWeight: '900',
    color: '#fff'
  }
});

export default Toolbar;
