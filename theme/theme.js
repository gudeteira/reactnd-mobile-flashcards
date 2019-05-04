import {StyleSheet} from 'react-native';

export const Colors = {
  primary: {
    normal: '#f06292',
    light: '#ff94c2',
    dark: '#ba2d65',
  },
  secondary: {
    normal: '#fafafa',
    light: '#ffffff',
    dark: '#c7c7c7',
  },
  text: '#000000',
  white: '#ffffff',
  background: '',
  surface: '',
  disabled: ''


};
export const Theme = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  homeContainer: {
    flex: 1,
    padding: 4,
    paddingVertical: 8,
  },
  row: {
    flexDirection: 'row',
  },
  spaceBetween: {alignContent: 'space-between'},
  flexStart: {alignSelf: 'flex-start'},
  flexEnd: {alignSelf: 'flex-end'},
  center: {alignSelf: 'center'},
  baseline: {alignSelf: 'baseline'},
  stretch: {alignSelf: 'stretch'},

});
