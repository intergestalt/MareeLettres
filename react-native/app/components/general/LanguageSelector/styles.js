import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '1rem',
    marginBottom: '1rem',
    flexDirection: 'row',
  },
  paragraph: {
    fontSize: '1rem',
    textAlign: 'center',
    color: '#888888',
  },
  paragraphHigh: {
    fontSize: '1rem',
    textAlign: 'center',
    color: '#000000',
    fontWeight: 'bold',
  },
  divider: {
    width: '2rem',
    textAlign: 'center',
    paddingRight: '0.2rem',
  },
});

export default styles;
