import { Platform } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  yes: {},
  no: {},
  inactive: {},
  panel: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  panelText1: {
    top: '$textOffset1Rem',
    marginRight: 5,
    fontFamily: 'arial_normal',
    fontSize: '1rem',
    fontColor: '$textGrey',
  },
  panelText2: {
    top: '$textOffset1Rem',
    marginLeft: 10,
    marginRight: 5,
    fontFamily: 'arial_normal',
    fontSize: '1rem',
    fontColor: '$textGrey',
  },
  l: { height: '2rem' },
  m: { height: '1.25rem' },
  s: { height: '0.75rem' },
});

export default styles;
