import { TabNavigator, StackNavigator } from 'react-navigation';
// import { Easing, Animated } from 'react-native';

import Home from '../screens/single/Home';
import Stream from '../screens/single/Stream';
import Challenges from '../screens/vote/Challenges';
import ChallengeSelector from '../screens/vote/ChallengeSelector';
import MapOverview from '../screens/map/MapOverview';
import How from '../screens/single/How';
import About from '../screens/single/About';
import { TabBar } from '../components/general/TabBar';
// import CardStackStyleInterpolator from 'react-navigation/src/views/CardStackStyleInterpolator'

/* export const MyCustomTransition = (index, position) => {
  const inputRange = [index - 1, index, index + 0.99, index + 1];

  const input = new Animated.Value(0.3);
  const test = input.interpolate({
    inputRange: [0, 1],
    outputRange: [50, 100],
    extrapolate: 'clamp',
  });
  input.setValue(3);

  const opacity = position.interpolate({
    inputRange,
    outputRange: [0, 1, 1, 0],
  });

  const translateX = 0;
  const translateY = position.interpolate({
    inputRange,
    outputRange: [50, 0, 0, 0],
  });

  return {
    opacity,
    transform: [{ translateX }, { translateY }],
  };
};

const MyTransitionSpec = {
  duration: 4000,
  // easing: Easing.bezier(0.2833, 0.99, 0.31833, 0.99),
  // timing: Animated.timing,
};

const TransitionConfiguration = () => ({
  // Define scene interpolation, eq. custom transition
  // transitionSpec: MyTransitionSpec,
  screenInterpolator: () =>
    //    const { position, scene } = sceneProps;
    //   const { index } = scene;
    null, // MyCustomTransition(index, position);
}); */

const VoteStack = StackNavigator(
  {
    Challenges: {
      screen: Challenges,
    },
    ChallengeSelector: {
      screen: ChallengeSelector,
    },
  },
  {
    headerMode: 'none',
    // NO TRANSITION AT ALL
    // transitionConfig: TransitionConfiguration,
    mode: 'modal',
    navigationOptions: {
      gesturesEnabled: false,
    },
  },
);

/* For Replacing the Stack.

Call:
 props.navigation.dispatch({
    type: 'ReplaceCurrentScreen',
    routeName: 'Challenges',
    params: {},
    key: 'Challenges',
  });

Custom transition to replace

const prevGetStateForAction = VoteStack.router.getStateForAction;
VoteStack.router = {
  ...VoteStack.router,
  getStateForAction(action, state) {

    if (state && action.type === 'ReplaceCurrentScreen') {
      const routes = state.routes.slice(0, state.routes.length - 1);
      routes.push(action);
      return {
        ...state,
        routes,
        index: routes.length - 1,
      };
    }
    return prevGetStateForAction(action, state);
  },
}; */

const tabNavigator = TabNavigator(
  {
    Home: {
      screen: Home,
    },
    Vote: {
      screen: VoteStack,
    },
    Become: {
      screen: MapOverview,
    },
    Stream: {
      screen: Stream,
    },
    About: {
      screen: About,
    },
    How: {
      screen: How,
    },
  },
  {
    tabBarPosition: 'top',
    tabBarComponent: TabBar,
    navigationOptions: {
      tabBarVisible: true,
    },
    lazy: true,
    swipeEnabled: false,
    animationEnabled: false,
    //    tabBarPosition: 'bottom',
    initialRouteName: 'Vote',
  },
);

// for language selection at start
const rootNavigator = StackNavigator({
  Root: {
    screen: tabNavigator,
    navigationOptions: {
      header: null,
    },
  },
});

export default rootNavigator;
