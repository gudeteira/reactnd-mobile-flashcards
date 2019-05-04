import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Colors} from 'react-native-paper';
import {Provider} from 'react-redux';
import {CustomStatusBar} from './components';
import Router from './router/Router';
import {setLocalNotification} from './services/Notifications';
import store from './store';

export default class App extends React.Component {

  componentDidMount() {
    setLocalNotification();
  }

  render() {
    return (
      <Provider store={store}>
        <View style={{flex: 1, backgroundColor: Colors.grey50}}>
          <CustomStatusBar barStyle="light-content"/>
          <View style={{flex: 1}}>
            <Router/>
          </View>
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 25,
  },
  surface: {
    padding: 8,
    height: 80,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
  },
});
