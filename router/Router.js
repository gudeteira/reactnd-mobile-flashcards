import {Animated, Easing} from 'react-native';
import {createAppContainer, createStackNavigator} from 'react-navigation';
import {AddDeck, AddQuestion, Deck, Home, Question, QuizSummary} from '../components';

const navigationOptions = {
  header: null,
};
export default createAppContainer(createStackNavigator({
    Home: {
      screen: Home,
      navigationOptions
    },
    Deck: {
      screen: Deck,
      navigationOptions
    },
    AddDeck: {
      screen: AddDeck,
      navigationOptions
    },
    AddQuestion: {
      screen: AddQuestion,
      navigationOptions
    },
    Question: {
      screen: Question,
      navigationOptions
    },
    QuizSummary: {
      screen: QuizSummary,
      navigationOptions
    }
  }, {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      gesturesEnabled: false,
      headerMode: 'screen',
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