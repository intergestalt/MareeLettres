import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native';

export default EStyleSheet.create({
  QRReader: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    position: 'absolute',
    zIndex: -1
  },
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  preview: {

  },
  take__button: {
    position: 'absolute',
    bottom: '0%',
    right: '0%',
    backgroundColor: 'transparent',
    padding: 10,
  },

  take__button__text: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: '2rem',
  },


});
