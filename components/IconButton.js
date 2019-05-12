import {MaterialIcons} from '@expo/vector-icons';
import PropTypes from 'prop-types';
import React, {PureComponent} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';

class IconButton extends PureComponent {
  static propTypes = {
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    onPress: PropTypes.func,
    name: PropTypes.string,
    size: PropTypes.number,
    color: PropTypes.string,
  };

  renderChildren = () => {
    const {children, name, size, color} = this.props;
    if (name) {
      return <MaterialIcons name={name} size={size || 24} color={color || 'white'}/>;
    }
    return children;

  };

  render() {
    const {style, onPress} = this.props;
    const children = this.renderChildren();
    return (
      <TouchableOpacity onPress={onPress}
                        style={[styles.menuIconContainer, style]}>
        {children}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  menuIconContainer: {
    borderWidth: 1,
    borderColor: 'transparent',
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default IconButton;
