import { screenHeight } from '../helper/screen';

console.log(`SCREENHEIGHT ${screenHeight}`);
const globalStyles = {
  $challengeSelectorHeaderHeight: '6rem',
  $screenLoadingBackgroundColor: 'rgb(90, 88, 112)',
  $backgroundColor: '#DDDDDD',
  $backgroundColorMenuItem: 'rgb(245,132,102)',
  $highlightDraggingLetterColor: 'rgb(245,132,102)',
  $draggingLetterCursorColor: 'rgb(90, 88, 112)',
  $statusBarColor: 'rgb(90,88,112)',
  $seePastTopicsButtonColor: 'rgb(90,88,112)',
  $strokeWidth: 1,
  $proposalPaddingHorizontal: '10%',
  outline: 0, // set to 1 to see the elements boundaries
  rem: screenHeight > 800 ? 24 : screenHeight > 600 ? 20 : 16, // dividable by 4 -> 0.25rem, 0.5rem, 0.75rem
  androidTextOffset: screenHeight > 800 ? -3 : screenHeight > 600 ? -2 : -1, // dividable by 4 -> 0.25rem, 0.5rem, 0.75rem
};

export default globalStyles;
