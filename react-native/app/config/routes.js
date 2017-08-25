import { TabNavigator, StackNavigator } from 'react-navigation';

import SplashScreenB from '../screens/single/SplashScreenB';
import LanguageSelector from '../screens/single/LanguageSelector';

import Stream from '../screens/single/Stream';
import Challenges from '../screens/vote/Challenges';
import ChallengeSelector from '../screens/vote/ChallengeSelector';
import Submit from '../screens/vote/Submit';
import Info from '../screens/single/Info';

import MapOverview from '../screens/map/MapOverview';
import MapCamera from '../screens/map/MapCamera';
import LetterSelector from '../screens/map/LetterSelector';
import QRCodeGet from '../screens/map/QRCodeGet';
import QRCodeSend from '../screens/map/QRCodeSend';

import { TabBar } from '../components/general/TabBar';
import { myRootTransitionConfig } from '../helper/customTransitions';

const VoteStack = StackNavigator(
  {
    Challenges: {
      screen: Challenges,
    },
    ChallengeSelector: {
      screen: ChallengeSelector,
    },
    Submit: {
      screen: Submit,
    },
  },
  {
    headerMode: 'none',
    mode: 'modal',
    navigationOptions: {
      gesturesEnabled: false,
    },
  },
);
const MapStack = StackNavigator(
  {
    MapOverview: {
      screen: MapOverview,
    },
    MapCamera: {
      screen: MapCamera,
    },
    LetterSelector: {
      screen: LetterSelector,
    },
    QRCodeGet: {
      screen: QRCodeGet,
    },
    QRCodeSend: {
      screen: QRCodeSend,
    },
  },
  {
    headerMode: 'none',
    mode: 'modal',
    navigationOptions: {
      gesturesEnabled: false,
    },
  },
);

const tabNavigator = TabNavigator(
  {
    Vote: {
      screen: VoteStack,
    },
    Become: {
      screen: MapStack,
    },
    Stream: {
      screen: Stream,
    },
    Info: {
      screen: Info,
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
    // tabBarPosition: 'bottom',
    initialRouteName: 'Vote',
  },
);

// for language selection at start
const rootNavigator = StackNavigator(
  {
    SplashScreenB: {
      screen: SplashScreenB,
      navigationOptions: {
        header: null,
      },
    },
    LanguageSelector: {
      screen: LanguageSelector,
      navigationOptions: {
        header: null,
      },
    },
    Root: {
      screen: tabNavigator,
      navigationOptions: {
        header: null,
      },
    },
  },
  {
    headerMode: 'none',
    mode: 'modal',
    navigationOptions: {
      gesturesEnabled: false,
    },
    // Disable all animations
    //   transitionConfig: () => ({ screenInterpolator: () => null }),
    // Use My Custum Transition
    transitionConfig: myRootTransitionConfig,
    initialRouteName: 'SplashScreenB',
  },
);
const defaultGetStateForAction = rootNavigator.router.getStateForAction;
rootNavigator.router.getStateForAction = (action, state) => {
  const result = defaultGetStateForAction(action, state);
  return result;
};
export default rootNavigator;
