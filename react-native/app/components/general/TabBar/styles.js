import EStyleSheet from 'react-native-extended-stylesheet';
import { StatusBar } from 'react-native';

const styles = EStyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
    display: 'flex',
    backgroundColor: '#aaaaaa',
    // height: 30,
    // borderRadius: 7,
    '@media ios': {
      paddingTop: 20,
    },
    '@media android': {
      paddingTop: StatusBar.currentHeight, // android only
    },
  },
  tab: {
    flexGrow: 1,
  },
  text: {
    color: '#555555',
    fontSize: '1rem',
    lineHeight: '2.5rem',
    textAlign: 'center',
  },
  textHigh: {
    color: 'white',
    fontSize: '1rem',
    lineHeight: '2.5rem',
    backgroundColor: 'black',
    textAlign: 'center',
  },
});

export default styles;
