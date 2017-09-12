import { Platform } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  containerStyle: {
    paddingTop: Platform.OS === 'android' ? 0 : 20,
    paddingHorizontal: '2rem',
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
    color: '#ffffff',
    fontFamily: 'normal',
  },
  messageStyle: {
    fontFamily: 'normal',
    fontSize: '1rem',
    textAlign: 'center',
    color: '#ffffff',
    paddingBottom: 15,
  },
  buttonStyle: {
    paddingTop: 10,
    paddingBottom: 10,
    fontWeight: 'bold',
    fontSize: '1rem',
    textAlign: 'center',
    color: '#ffffff',
  },
});
