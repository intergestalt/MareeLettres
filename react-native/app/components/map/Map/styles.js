import EStyleSheet from 'react-native-extended-stylesheet';
import letterstyles from '../Overlay/styles';

const menuHeight = letterstyles.$menuHeight;

const styles = EStyleSheet.create({
  $drop_zone_border: '#666',
  $drop_zone_background: 'transparent',
  container: {
    flex: 1,
    width: '100%',
    zIndex: -1,
  },
  mapCurtain: {
    width: '100%',
    height: '100%',
    backgroundColor: '#000',
    zIndex: 10
  },
  letter: {
    // fontWeight: 'bold',
    color: 'white',
    fontFamily: 'impact',
  },
  letter_dropzone: {
    fontWeight: 'normal',
    color: 'rgba(255,255,255,0.5)',
    fontSize: 12,
  },
  letter_draggable: {
    fontWeight: 'bold',
    color: 'rgb(245,132,102)',
    fontSize: '1rem',
  },
  button: {
    backgroundColor: 'transparent',
    position: 'absolute',
    right: '0%',
    zIndex: 10,
  },
  buttonCamera: {
    top: 0,
  },
  buttonCentreMap: {
    bottom: '95 + 1rem',
    right: '0.5rem',
    zIndex: 5
  },
  buttonCentreMapImage: {
    height: '1.7rem',
  },
  button_text: {
    padding: 8,
    fontFamily: 'impact',
    fontSize: '1.2rem',
    color: 'white',
    backgroundColor: 'transparent',
  },
  proxy_letter: {
    position: 'absolute',
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'impact',
    backgroundColor: 'transparent',
    padding: 0,
  },
});

const mapstyles = require('./assets/google-map-style.json');

export { styles, mapstyles };
