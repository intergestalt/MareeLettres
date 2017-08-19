import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  $grey: '#eeeeee',
  $margin: 12,
  $marginHalf: 6,

  letter: {
    color: '#000',
  },
  selected: {
    color: 'rgba(0,0,0,0.25)',
  },
  main: {
    flex: 1,
    backgroundColor: '$grey',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    margin: '$margin',
    marginTop: '$marginHalf',
  },
  secondary: {
    flex: 1,
    backgroundColor: '$grey',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '$marginHalf',
    marginRight: '$margin',
    marginBottom: '$margin',
  }
});
