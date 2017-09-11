import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  $grey: '#eeeeee',
  $margin: 12,
  $marginHalf: 12,
  $padding: 20,
  $indexLetter: 1000,
//  $outline: true,
  $letterWidth: 40,
  $letterHeight: 50,
  $letterDraggedHeight: 80,
  $letterDraggedWidth: 80,

  letter: {
    opacity: 1,
    color: '#000',
    backgroundColor: 'transparent',
    fontFamily: 'impact',
  },
  letter_view: {
    backgroundColor: 'transparent',
    width: '$letterWidth',
    height: '$letterHeight',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  letter_view_dragged: {
    backgroundColor: 'transparent',
    width: '$letterDraggedWidth',
    height: '$letterDraggedHeight',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  container_main: {
    flex: 1,
    backgroundColor: '$grey',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    margin: '$margin',
    marginTop: 0,
    marginBottom: 0,
  },
  container_secondary: {
    flex: 1,
    backgroundColor: '$grey',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 0,
    marginRight: '$margin',
    marginBottom: 0,
  },
  draggable: {
    position: 'absolute',
    zIndex: '$indexLetter'
  }
});
