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
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    width: '3rem', // correct value would be the width of the actual VoteMark. But doesn't matter
  },
  markContainer2: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  text: {
    fontSize: '2rem',
    width: '100%',
    textAlign: 'center',
    fontFamily: 'impact',
    marginBottom: '0.5rem',
    paddingHorizontal: '$proposalPaddingHorizontal',
  },
  voteMark: {
    alignSelf: 'center',
  },
  voteMarkPanel: {
    marginTop: '0.25rem',
  },
});
export default styles;
