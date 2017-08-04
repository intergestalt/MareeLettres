import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: 'column',
    position: 'relative',
    backgroundColor: '$backgroundColor',
    height: '100%',
    width: '100%',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '$backgroundColor',
  },
});
