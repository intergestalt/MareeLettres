import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native';

export default EStyleSheet.create({

  mainView: {
    flex: 1,
    backgroundColor: 'gray'
  },
  cameraContainer: { 
    flex: 0.8, 
    backgroundColor: 'transparent' 
  },
  controls: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'transparent',
    flexDirection: 'row',
  },
  button: {
    flex: 0.2,
    alignItems: 'center',
  },
  buttonText: { 
    fontSize: 18, 
    color: 'white',
    fontFamily: 'impact' 
  },
  photoContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    zIndex: 1
  },
  overlayDummy: {
    position: 'absolute',
    top: 0,
    left: 0,
    fontSize: 24, 
    color: 'white',
    fontFamily: 'impact', 
    zIndex: 3 
  },
  photo: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
    zIndex: 2
  }


});
