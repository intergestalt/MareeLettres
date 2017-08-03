import { StatusBar } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    '@media ios': {
      paddingTop: 20,
    },
    '@media android': {
      paddingTop: StatusBar.currentHeight, // android only
    },
    paddingHorizontal: 20,
    height: '10%',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#aaaaaa',
    flexDirection: 'row',
  },
});

export default styles;
