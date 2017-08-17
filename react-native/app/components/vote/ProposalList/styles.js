import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  container: {
    position: 'absolute',
    flexDirection: 'column',

    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    flex: 1,
  },

  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    flex: 0.1,
  },
  listContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0.9,
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
    fontSize: '1.5rem',
    textAlign: 'center',
    fontFamily: 'impact',
  },

  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    flex: 1,
  },
  listHeaderLink: {
    fontSize: '1rem',
    color: '#FF0000',
  },
  listHeaderText: {
    fontSize: '1rem',
    color: '#000000',
  },
});
export default styles;
