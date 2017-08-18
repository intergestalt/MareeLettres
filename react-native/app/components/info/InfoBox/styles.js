import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  how: {
    position: 'relative',
    backgroundColor: '#FFFFFF',
    borderRadius: 7,
    padding: 20,
  },
  infoHeadline: {
    color: '#000000',
    fontSize: '2.5rem',
    lineHeight: '2rem',
    backgroundColor: '#FFFFFF',
    textAlign: 'center',
    fontFamily: 'impact',
  },
});
