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
  },
  listContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    flex: 1,
  },
  listContainerFinished: {
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
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingTop: '1rem',
    top: '0.5rem', // to align with center text
    marginHorizontal: '1.25rem',
  },
  itemCenter: {
    position: 'relative',
    flex: 1,
    paddingVertical: '1rem',
    alignItems: 'center',
  },
  itemRight: {
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingTop: '1rem',
    top: '0.5rem', // to align with center text
    marginHorizontal: '1.25rem',
  },
  text: {
    fontSize: '2rem',
    textAlign: 'center',
    fontFamily: 'impact',
    marginBottom: '0.25rem',
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: '10%',
  },
  listHeaderLink: {
    fontSize: '1rem',
    top: '$textOffset1Rem',
    color: '$textGrey',
    fontFamily: 'arial_normal',
    paddingTop: '0.5rem',
    paddingBottom: '0.5rem',
  },
  listHeaderText: {
    fontSize: '1rem',
    top: '$textOffset1Rem',
    color: 'black',
    fontFamily: 'arial_normal',
    paddingTop: '0.5rem',
    paddingBottom: '0.5rem',
  },
  listFooter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  voteMarkPanel: {
    marginTop: '0.25rem',
  },
});
export default styles;
