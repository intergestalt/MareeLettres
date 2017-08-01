import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '20%',
    flexDirection: 'row',
  },
  paragraph: {
    fontSize: '2rem',
    textAlign: 'center',
    color: '#888888',
  },
  paragraphHigh: {
    fontSize: '2rem',
    textAlign: 'center',
    color: '#000000',
  },
});

export default styles;
