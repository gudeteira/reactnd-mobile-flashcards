import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {Animated, Dimensions, StyleSheet, TouchableWithoutFeedback, View} from 'react-native';

const {height} = Dimensions.get('window');
const defaultHeight = height * 0.50;

export default class PopUp extends Component {

  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func,
  };

  state = {
    position: new Animated.Value(this.props.isOpen ? 0 : -defaultHeight),
    opacity: new Animated.Value(0),
    height: defaultHeight,
    visible: this.props.isOpen
  };

  componentWillReceiveProps(nextProps) {
    if (!this.props.isOpen && nextProps.isOpen) {
      this.animateOpen();
    } else if (this.props.isOpen && !nextProps.isOpen) {
      this.animateClose();
    }
  }

  animateOpen() {
    this.setState({visible: true}, () => {
      Animated.parallel([
        Animated.timing(this.state.opacity, {toValue: 0.5,}),
        Animated.timing(this.state.position, {toValue: 0, duration: 300}),
      ]).start();
    });
  }

  animateClose() {
    Animated.parallel([
      Animated.timing(this.state.opacity, {toValue: 0}),
      Animated.timing(this.state.position, {toValue: -height, duration: 300}),
    ]).start(() => this.setState({
      height: defaultHeight,
      visible: false,
    }));
  }

  render() {
    if (!this.state.visible) {
      return null;
    }
    const {children} = this.props;
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={this.props.onClose}>
          <Animated.View style={[styles.backdrop, {opacity: this.state.opacity}]}/>
        </TouchableWithoutFeedback>
        <Animated.View
          style={[styles.modal, {
            height: this.state.height,
            transform: [{translateY: this.state.position}, {translateX: 0}]
          }]}>
          {children}
        </Animated.View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: 'transparent',
    elevation: 2,

  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'black',
  },
  modal: {
    backgroundColor: 'white',
  }
});