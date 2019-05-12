import PropTypes from 'prop-types';
import React, {PureComponent} from 'react';
import {StyleSheet, Text, View,} from 'react-native';
import IconButton from './IconButton';

class Toolbar extends PureComponent {
  static propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    back: PropTypes.func,
    buttons: PropTypes.array
  };

  render() {
    const {title, subtitle, buttons, back} = this.props;
    const height = subtitle ? 80 : 56;

    return (
      <View style={styles.container}>
        <View style={styles.toolbarBackground}/>
        <View>
          <View style={[styles.toolbarContainer, {height: height}]}>
            {
              back && <View><IconButton name={'chevron-left'} size={30} onPress={back}/></View>
            }
            <View style={{flex: 1, alignItems: 'flex-start', justifyContent: 'space-between', paddingVertical: 10}}>
              <View style={styles.titleContainer}>
                <Text style={styles.titleText}>{title}</Text>
              </View>
              {
                subtitle &&
                <View style={styles.titleContainer}>
                  <Text style={styles.subtitleText}>{subtitle}</Text>
                </View>
              }
            </View>
            <View style={{flexDirection: 'row',}}>
              {buttons}
            </View>
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
    justifyContent: 'space-between',
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
  },
  subtitleText: {
    fontSize: 12,
    color: '#fff'
  }
});

export default Toolbar;
