import EStyleSheet from 'react-native-extended-stylesheet';
import Dimensions from 'Dimensions';

const aspect_ratio_factor = 558 / 35; // equals to 35pt height on iPhone SE. the factor should be lower for wider screens, compared to iPhone SE

const em = Dimensions.get('window').height / aspect_ratio_factor;

const styles = EStyleSheet.create({
  container: { flex: 1, flexDirection: 'column' },
  titleContainer: {
    //textAlign: 'center', // textAlgin cannot be assigned to View (gives warning)
    paddingTop: '1.5rem',
    flexDirection: 'row',
    backgroundColor: '#000033',
    width: '100%',
  },
  dragContainer: { flex: 1 },
  submitContainer: {},

  backStyle: {
    color: 'white',
    paddingLeft: '1.5rem',
    fontSize: '2rem',
    justifyContent: 'center',
    fontFamily: 'impact',
  },
  title: {
    fontFamily: 'normal',
    fontSize: '1rem',
    color: 'white',
    textAlign: 'center',
    paddingBottom: '0.5rem',
    paddingHorizontal: '20%',
  },
  writingArea: {
    backgroundColor: '#000033',
    width: '100%',
    flex: 0.3,
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
    backgroundColor: 'white',
    width: '100%',
    paddingTop: (25 / 35 - (1 - 35 / 40) / 2) * em,
    paddingBottom: (25 / 35 - (1 - 35 / 40) / 2) * em,
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButtonText: {
    fontSize: '1rem',
    fontFamily: 'normal',
    textAlign: 'center',
    color: 'white',
  },
  yesButton: {
    height: '3.5rem',
    flex: 0.5,
    backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noButton: {
    height: '3.5rem',
    flex: 0.5,
    backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
  },
  yesNoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});

export default styles;
