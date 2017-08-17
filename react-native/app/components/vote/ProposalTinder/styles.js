import EStyleSheet from 'react-native-extended-stylesheet';
import { screenWidth } from '../../../helper/screen';

const styles = EStyleSheet.create({
  $swipeWidth: screenWidth,

  container: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: '#eeeeee',
  },
  containerBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    flexDirection: 'column',
    flex: 1,
    backgroundColor: '#666666',
    justifyContent: 'center',
    alignItems: 'center',
  },

  topContainer: {
    position: 'relative',
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomContainer: {
    flexDirection: 'row',
    position: 'relative',
    flex: 0.5,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  noContainer1: {
    position: 'relative',
  },
  noContainer2: {
    position: 'absolute',
  },
  text: {
    fontSize: '1.5rem',
    textAlign: 'center',
    fontFamily: 'impact',
  },
});
export default styles;
