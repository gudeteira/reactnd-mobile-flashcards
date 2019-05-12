import PropTypes from 'prop-types';
import React, {PureComponent} from 'react';
import {StyleSheet, TouchableWithoutFeedback, View} from 'react-native';
import Content from './Content';
import Header from './Header';


class Card extends PureComponent {
  static propTypes = {
    item: PropTypes.object.isRequired,
    onPress: PropTypes.func.isRequired
  };
  onPressed = () => {
    const {onPress} = this.props;
    onPress();
  };

  render() {
    const {item, style,} = this.props;
    const {name, ...rest} = item;

    return (
      <TouchableWithoutFeedback onPress={this.onPressed}>
        <View style={[styles.container, style]} pointerEvents="box-only">
          <Header name={name}/>
          <Content {...rest} />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
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
  },
});

export default Card;
