import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native';

export default EStyleSheet.create({

  mainView: {
    flex: 1,
    backgroundColor: 'gray'
  },
  cameraContainer: { 
    position: 'absolute',
    top: 0,
    height: '100%', 
    width: '100%',
    backgroundColor: 'transparent', 
    zIndex: 1
  },
  photoContainer: {
    position: 'absolute',
    top: 0,
    height: '100%', 
    width: '100%',
    backgroundColor: 'transparent',
    zIndex: 2
  },
  photo: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
    zIndex: 2
  },
  controls: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    zIndex: 3
  },
  button: {
    alignItems: 'center',
    padding: 10
  },
  buttonText: { 
    fontSize: 18, 
    color: 'white',
    fontFamily: 'impact' 
  },
  overlay: {
    position: 'absolute',
    top: 0,
    height: '100%', 
    width: '100%',
    backgroundColor: 'transparent', 
    zIndex: 4,
  },
  letter: {
    fontFamily: 'impact',
    color: "#fff",
    zIndex: 5
  }
});
