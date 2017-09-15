import EStyleSheet from 'react-native-extended-stylesheet';
import { StatusBar } from 'react-native';

// TODO link colours in global stylesheet

export default EStyleSheet.create({
  $white: '#ffffff',
  $black: '#000000',
  $lettersHeight: 100,
  $menuHeight: 40,
  $padding: 8,

  // bottom tab menu

  menu__container: {
    width: '100%',
    height: '$menuHeight',
    backgroundColor: '$white',
    flexDirection: 'row',
  },

  menu__item: {
    justifyContent: 'center',
    alignItems: 'center',
    borderTopColor: '$black',
    borderRightColor: '$black',
    borderTopWidth: 1,
    borderRightWidth: 1,
    flex: 1,
  },

  menu__item__last: {
    borderRightWidth: 0,
  },

  menu__text: {
    color: '$black',
    paddingHorizontal: '$padding',
    paddingTop: 4,
    paddingBottom: 4,
    textAlign: 'center',
  },

  // camera button

  camera__button: {
    position: 'absolute',
    top: '0.5rem',
    right: '0.4rem',
    height: '0.8rem',
    backgroundColor: 'transparent',
  },

  camera__button__text: {
    color: '$white',
    fontSize: '1.2rem',
    fontFamily: 'impact',
    padding: 8,
  },

  // letters menu

  letters__container: {
    width: '100%',
    height: '$lettersHeight',
    backgroundColor: '$white',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  letters__label__you: {
    width: '33.333%',
    paddingTop: 8,
    paddingBottom: 8,
    textAlign: 'center',
    fontFamily: 'normal',
  },

  letters__label__friends: {
    width: '66.666%',
    paddingTop: 8,
    paddingBottom: 8,
    textAlign: 'center',
    fontFamily: 'normal',
  },

  letters__item__you: {
    width: '33.333%',
    marginTop: 10,
  },

  letters__row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
    marginTop: 10,
  },

  letters__item__friends: {
    width: '66.6666%',
  },
});
