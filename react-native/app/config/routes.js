import { StackNavigator } from 'react-navigation';

import Home from '../screens/Home';
import Challenges from '../screens/Challenges';

export default StackNavigator({
  Home: {
    screen: Home,
    title: 'Home',
  },
  Challenges: {
    screen: Challenges,
    title: 'Challenges',
  },
});
