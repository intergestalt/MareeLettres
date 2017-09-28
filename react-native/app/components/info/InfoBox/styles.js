import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 0,
    flex: 1,
  },
  debugInfoText: {
    color: '$textGrey',
    opacity: 0.7,
    lineHeight: '1rem',
    fontSize: '0.7rem',
    textAlign: 'center',
    fontFamily: 'arial_normal',
    paddingBottom: '0.5rem',
  },
});
