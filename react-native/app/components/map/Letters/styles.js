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
    fontFamily: 'impact',
  },
  disabled: {
    opacity: 1,
    textAlign: 'center',
    backgroundColor: 'transparent',
    fontFamily: 'impact',
  },
  letter_area: {
    width: 40,
    height: 40,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container_main: {
    flex: 1,
    backgroundColor: '$grey',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    margin: '$margin',
    marginTop: '$marginHalf',
  },
  container_secondary: {
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
