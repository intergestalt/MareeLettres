import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  yes: {},
  no: {},
  inactive: {},
  panel: {
    flexDirection: 'row',
  },
  panelText1: {
    marginRight: 5,
    fontFamily: 'normal',
    fontSize: '1rem',
  },
  panelText2: {
    marginLeft: 10,
    marginRight: 5,
    fontFamily: 'normal',
    fontSize: '1rem',
  },
  l: { height: '2rem' },
  m: { height: '1.25rem' },
  s: { height: '0.75rem' },
});

export default styles;
