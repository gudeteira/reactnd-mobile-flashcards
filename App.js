import React from 'react';
import {View} from 'react-native';
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
        <View style={{flex: 1}}>
          <CustomStatusBar barStyle="light-content"/>
          <View style={{flex: 1}}>
            <Router/>
          </View>
        </View>
      </Provider>
    );
  }
}
