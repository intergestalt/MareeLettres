import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    flex: 1,
  },
  itemContainer: {
    flexDirection: 'row',
    position: 'relative',
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  itemLeft: {
    position: 'relative',
    flex: 0.2,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  itemCenter: {
    position: 'relative',
    flex: 0.6,
    padding: 40,
  },
  itemRight: {
    position: 'relative',
    flex: 0.2,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  text: {
    fontSize: '2rem',
    textAlign: 'center',
    fontFamily: 'impact',
  },
});
export default styles;
