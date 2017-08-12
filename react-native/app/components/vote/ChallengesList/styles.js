import EStyleSheet from 'react-native-extended-stylesheet';
import { StyleSheet } from 'react-native';

const styles = EStyleSheet.create({
  container: {
    backgroundColor: '#00FF00',
    height: '70%',
    width: '80%',
    top: 10,
    borderRadius: 17,
  },
  headline: {
    fontSize: 20,
    left: 0,
    marginVertical: 17,
    textAlign: 'center',
  },
  list: {
    left: 0,
  },
  separator: {
    backgroundColor: '#555555',
    height: StyleSheet.hairlineWidth,
    flex: 1,
    marginLeft: 20,
    marginRight: 20,
  },
  row: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: '#00FF00',
  },
  title: {
    color: '#666666',
    fontSize: 16,
    textAlign: 'center',
  },
  itemContainer: {
    marginLeft: 20,
    marginRight: 20,
  },
});

export default styles;
