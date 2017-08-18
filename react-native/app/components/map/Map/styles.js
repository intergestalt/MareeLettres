import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
	container: {
    flex: 1,
    width: '100%',
  },
  letter: {
    fontWeight: 'bold',
		color: 'white',
		fontSize: 16,
  },
	letterDropZone: {
		fontWeight: 'normal',
		color: 'rgba(255,255,255,0.5)',
		fontSize: 16,
	},
	letterDraggable: {
    fontWeight: 'bold',
		color: 'rgb(245,132,102)',
		fontSize: 18,
  },
	
});
