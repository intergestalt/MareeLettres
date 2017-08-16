import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  $backgroundColorMenuItem: 'rgb(245,132,102)',
  container: {
    position: 'absolute',
    top: '0%',
    width: '25%',
    left: '0%',
    zIndex: 10,
    borderBottomWidth: '$strokeWidth',
    borderRightWidth: '$strokeWidth',
    borderTopWidth: '$strokeWidth',
    borderBottomWidth: '$strokeWidth',
    backgroundColor: '$backgroundColorMenuItem',
  },
  text: {
    color: 'black',
    fontSize: '1.25rem',
    lineHeight: '2rem',
    textAlign: 'center',
    fontFamily: 'impact',
  },
  textWhite: {
    color: 'white',
    fontSize: '1.25rem',
    lineHeight: '2rem',
    textAlign: 'center',
    fontFamily: 'impact',
  },
  containerSimple: {
    position: 'absolute',
    top: '0%',
    left: '0%',
    padding: 20,
    paddingLeft: 10,
  },
  textSimple: {
    color: 'black',
    fontSize: '2rem',
    textAlign: 'center',
  },
  textSimpleWhite: {
    color: 'white',
    fontSize: '2rem',
    textAlign: 'center',
  },
});

export default styles;
