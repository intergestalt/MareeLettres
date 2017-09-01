import EStyleSheet from 'react-native-extended-stylesheet';
import Dimensions from 'Dimensions';

const aspect_ratio_factor = 558 / 35; // equals to 35pt height on iPhone SE. the factor should be lower for wider screens, compared to iPhone SE

const em = Dimensions.get('window').height / aspect_ratio_factor;

const styles = EStyleSheet.create({
  container: {},
  title: {
    fontFamily: 'normal',
    fontSize: '1rem',
    color: 'white',
    textAlign: 'center',
    paddingTop: '1.5rem',
    paddingBottom: '0.5rem',
    paddingHorizontal: '20%',
  },
  writingArea: {
    flex: 1,
    backgroundColor: '#000033',
    width: '100%',
  },
  writingAreaContentContainer: {
    justifyContent: 'center',
    flex: 1,
  },
  writingAreaContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingHorizontal: 0.35 * em,
  },
  keyboard: {
    flex: 1,
    backgroundColor: 'white',
    width: '100%',
    paddingTop: (25 / 35 - (1 - 35 / 40) / 2) * em,
    paddingHorizontal: 0.35 * em,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    // height: Dimensions.get('window').height / 2 - '50% - 3rem',
  },
  letter: {
    color: 'grey',
    fontSize: 1 * em,
    fontFamily: 'impact',
    marginLeft: 0.12 * em,
    marginRight: 0.12 * em,
    lineHeight: 40 / 35 * em,
    alignSelf: 'center',
    backgroundColor: 'transparent',
  },
  letterActive: {
    color: '$highlightDraggingLetterColor',
    backgroundColor: 'transparent',
  },
  letterContainer: {
    position: 'absolute',
  },
  space: {},
  submitButton: {
    height: '3.5rem',
    backgroundColor: 'black',
  },
  submitButtonText: {
    fontSize: '1rem',
    fontFamily: 'normal',
    lineHeight: '3.5rem',
    textAlign: 'center',
    color: 'white',
  },
});

export default styles;
