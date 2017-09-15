import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: '1rem',
  },
  text: {
    color: 'black',
    fontSize: '1rem',
    lineHeight: '1rem',
    textAlign: 'center',
    fontFamily: 'normal',
  },
});

export default styles;
