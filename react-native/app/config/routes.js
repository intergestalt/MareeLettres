import { StackNavigator } from 'react-navigation';

import Home from '../screens/Home';
import Challenges from '../screens/Challenges';
import MapOverview from '../screens/MapOverview';

export default StackNavigator({
  Home: {
    screen: Home,
  },
  Challenges: {
    screen: Challenges,
  },
  MapOverview: {
    screen: MapOverview,
  },
});
