import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native';

export default EStyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: 'gray',
  },
  cameraContainer: {
    position: 'absolute',
    top: 0,
    height: '100%',
    width: '100%',
    backgroundColor: 'transparent',
    zIndex: 1,
  },
  photoContainer: {
    position: 'absolute',
    top: 0,
    height: '100%',
    width: '100%',
    backgroundColor: 'transparent',
    zIndex: 2,
  },
  photo: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
    zIndex: 2,
  },
  controls: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    zIndex: 3,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  centerButton: {
    alignItems: 'center',
    padding: 15,
  },
  buttomSnapImage: {},
  panelButton: {
    borderTopWidth: 1,
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.8)',
  },
  panelButtonLast: {
    backgroundColor: 'black',
    borderLeftWidth: 1,
  },
  buttonText: {
    top: '0.25rem',
    fontSize: 18,
    color: 'black',
    fontFamily: 'arial_normal',
    lineHeight: '3rem',
  },
  buttonTextLast: {
    color: 'white',
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
    color: '#fff',
    zIndex: 5,
  },
  backButton: {
    position: 'absolute',
    top: 5,
    left: 10,
    zIndex: 5,
    backgroundColor: 'transparent',
  },
  backButtonText: {
    fontFamily: 'impact',
    color: '#fff',
    fontSize: 30,
  },
});
