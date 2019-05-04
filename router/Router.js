import {Animated, Easing} from 'react-native';
import {createAppContainer, createStackNavigator} from 'react-navigation';
import {AddDeck, AddQuestion, Deck, Home} from '../components';
import {Colors} from '../theme/theme';

export default createAppContainer(createStackNavigator({
    Home: {
      screen: Home,
      navigationOptions: {
        header: null,
      },
    },
    Deck: {
      screen: Deck,
      navigationOptions: ({navigation}) => ({
        headerTintColor: Colors.text,
        // header: null,
        // header: Deck.Header(navigation),
      }),
    },
    AddDeck: {
      screen: AddDeck,
      navigationOptions: ({navigation}) => ({
        headerTintColor: Colors.text,
        headerStyle: {
          backgroundColor: Colors.primary.light,
        },
      }),
    },
    AddQuestion: {
      screen: AddQuestion,
      navigationOptions: ({navigation}) => ({
        headerTintColor: Colors.text,
        headerStyle: {
          backgroundColor: Colors.primary.light,
        },
      }),
    }
  },{
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      gesturesEnabled: false,
      headerMode:'screen',
    },
    transitionConfig: () => ({
      transitionSpec: {
        duration: 300,
        easing: Easing.out(Easing.poly(4)),
        timing: Animated.timing,
      },
      screenInterpolator: sceneProps => {
        const {layout, position, scene} = sceneProps;
        const {index} = scene;

        const height = layout.initHeight;
        const translateY = position.interpolate({
          inputRange: [index - 1, index, index + 1],
          outputRange: [height, 0, 0],
        });

        const opacity = position.interpolate({
          inputRange: [index - 1, index - 0.99, index],
          outputRange: [0, 1, 1],
        });

        return {opacity, transform: [{translateY}]};
      },
    }),
  }
));