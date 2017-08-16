import EStyleSheet from 'react-native-extended-stylesheet';
import { screenWidth } from '../../../helper/screen';

const styles = EStyleSheet.create({
  $swipeWidth: screenWidth,

  container: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: '#00aa00',
  },
  containerBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    flexDirection: 'column',
    flex: 1,
    backgroundColor: '#006600',
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
  text: {
    fontSize: '1.5rem',
    textAlign: 'center',
    fontFamily: 'impact',
  },
});
export default styles;
