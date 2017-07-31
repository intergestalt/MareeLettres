import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  container: {
    position: 'absolute',
    left: 50,
    right: 50,
    bottom: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#aaaaaa',
    height: 24,
    borderRadius: 7,
  },
  text: {
    color: '#555555',
    fontSize: 16,
  },
  textHigh: {
    color: '#aa4444',
    fontSize: 16,
  },
});

export default styles;
