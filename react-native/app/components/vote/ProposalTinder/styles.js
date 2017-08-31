import EStyleSheet from 'react-native-extended-stylesheet';
import { screenWidth } from '../../../helper/screen';

const styles = EStyleSheet.create({
  $swipeWidth: screenWidth,

  container: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: '#fff',
  },
  containerBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    flexDirection: 'column',
    flex: 1,
    backgroundColor: '#fff',
  },

  topContainer: {
    position: 'relative',
    flex: 0.65,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomContainer: {
    flexDirection: 'row',
    position: 'relative',
    flex: 0.35,
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    paddingHorizontal: '$proposalPaddingHorizontal',
  },
  markContainer1: {
    position: 'relative',
    width: '10%', // correct value would be the width of the actual VoteMark. But doesn't matter
  },
  markContainer2: {
    position: 'absolute',
    top: 0,
  },
  text: {
    fontSize: '1.5rem',
    textAlign: 'center',
    fontFamily: 'impact',
    paddingHorizontal: '$proposalPaddingHorizontal',
  },
  voteMark: {
    alignSelf: 'center',
  }
});
export default styles;
