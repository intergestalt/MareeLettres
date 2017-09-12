import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'black',
    fontSize: '1rem',
    fontFamily: 'normal',
    padding: 24,
  },
  keyboard: {
    width: '100%',
  },
  keyboard__row: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  key: {
    fontFamily: 'impact',
    fontSize: '1.8rem',
    color: 'black',
    padding: 6,
  },
});
