import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text__container: {
    flex: 1,
    paddingHorizontal: '3rem',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: '1rem',
  },
  text: {
    color: 'black',
    fontSize: '1rem',
    fontFamily: 'arial_normal',
    textAlign: 'center',
    alignSelf: 'center',
    lineHeight: '1rem',
  },
  keyboard: {
    width: '100%',
    paddingBottom: '2rem',
  },
  keyboard__row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  key: {
    fontFamily: 'impact',
    fontSize: '2.5rem',
    color: 'black',
    padding: '0.25rem',
  },
});
