import {Constants} from 'expo';
import PropTypes from 'prop-types';
import React from 'react';
import {StatusBar, View} from 'react-native';
import {Colors} from '../theme/theme';

const CustomStatusBar = ({backgroundColor, ...props}) => {
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
};

CustomStatusBar.propTypes = {
  backgroundColor: PropTypes.string.isRequired
};
CustomStatusBar.defaultProps = {
  backgroundColor: Colors.white,
};

export default CustomStatusBar;