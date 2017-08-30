import { Platform } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  containerStyle: {
    paddingTop: Platform.OS === 'android' ? 0 : 20,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'transparent',
  },
  titleStyle: {
    position: 'relative',
    fontSize: '1rem',
    textAlign: 'center',
    color: '#0055AA',
    fontFamily: 'impact',
  },
  messageStyle: {
    fontSize: '1rem',
    textAlign: 'center',
    color: '#888888',
  },
  button: {
    fontSize: '1rem',
    textAlign: 'center',
    color: '#00AA55',
  },
});
