import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  $grey: '#eeeeee',
  $margin: 12,
  $marginHalf: 6,
  $padding: 20,
  $indexLetter: 1000,

  letter: {
    color: '#000',
    textAlign: 'center',
    backgroundColor: 'transparent',
  },
  disabled: {
    color: 'rgba(0,0,0,0.25)',
    textAlign: 'center',
    backgroundColor: 'transparent',
  },
  letter_area: {
    width: 40,
    height: 40,
    borderRadius: 40,
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  background_main: {
    flex: 1,
    backgroundColor: '$grey',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    margin: '$margin',
    marginTop: '$marginHalf',
  },
  background_secondary: {
    flex: 1,
    backgroundColor: '$grey',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '$marginHalf',
    marginRight: '$margin',
    marginBottom: '$margin',
  },
  draggable: {
    position: 'absolute',
    zIndex: '$indexLetter'
  }
});
