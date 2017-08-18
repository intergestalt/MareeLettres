import EStyleSheet from 'react-native-extended-stylesheet';
import { StatusBar } from 'react-native';

// TODO link colours in global stylesheet

export default EStyleSheet.create({

  $white: '#ffffff',
  $black: '#000000',
  $dropZoneContainerHeight: '60%',
  $dropZoneDiameter: 200,
  $lettersMenuHeight: 160,
  $lettersMenuUpperHeight: 100,
  $lettersMenuLowerHeight: 60,

  // camera button

  cameraButton: {
    position: 'absolute',
    top: '0%',
    right: '0%',
    backgroundColor: 'transparent',
    padding: 10,
  },
  cameraButtonText: {
    fontWeight: 'bold',
    color: '$white',
  },

  // drop zone

  dropZoneContainer: {
    position: 'absolute',
    height: '$dropZoneContainerHeight',
    backgroundColor: 'transparent',
    top: '0%',
    width: '100%',
    height: '$dropZoneContainerHeight',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropZone: {
    width: '$dropZoneDiameter',
    height: '$dropZoneDiameter',
    backgroundColor: 'transparent',
    borderColor: 'white',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: '$dropZoneDiameter',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  dropZoneText: {
    fontWeight: 'bold',
    color: '$white',
  },

  // letters menu

  lettersMenu : {
    width: '100%',
    height: '$lettersMenuHeight',
    backgroundColor: '$white',
  },
  lettersMenuUpper: {
    width: '100%',
    height: '$lettersMenuUpperHeight',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  lettersMenuYou: {
    width: '33.33%',
  },
  lettersMenuYourLetter: {
    flex: 1,
    margin: 8,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lettersMenuCoworkers: {
    width: '66.66%',
  },
  lettersMenuCoworkersRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  lettersMenuCoworkersLetter: {
    flex: 1,
    margin: 8,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lettersMenuLower: {
    width: '100%',
    height: '$lettersMenuLowerHeight',
    flexDirection: 'row'
  },
  lettersMenuLowerMenuItem: {
    width: '33.33%',
    flex: 1,
    borderTopColor: '$black',
    borderRightColor: '$black',
    borderTopWidth: 1,
    borderRightWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lettersMenuText: {
    padding: 8,
    textAlign: 'center',
  }
});
