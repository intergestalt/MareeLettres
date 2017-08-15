import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  target: {
    width: 200,
    height: 200,
    display: 'flex',
  },
  rowTop: {
    width: 50,
    height: 50,
    alignSelf: 'flex-start',
    borderTopWidth: '$strokeWidth',
    borderLeftWidth: '$strokeWidth',
    borderTopColor: '#fff',
    borderLeftColor: '#fff',
  },
  rowBottom: {
    width: 50,
    height: 50,
    marginTop: 100,
    alignSelf: 'flex-end',
    borderBottomWidth: '$strokeWidth',
    borderRightWidth: '$strokeWidth',
    borderBottomColor: '#fff',
    borderRightColor: '#fff',
  },
  text: {
    paddingTop: 20,
    position: 'absolute',
    top: '0%',
    width: '60%',
    color: 'black',
    fontSize: '1.2rem',
    textAlign: 'center',
  },
  textWhite: {
    paddingTop: 20,
    position: 'absolute',
    top: '0%',
    width: '60%',
    color: 'white',
    fontSize: '1.2rem',
    textAlign: 'center',
  },
  linearGradient: {
    flex: 1,
  },
});
