import { screenHeight } from '../helper/screen';
import { Platform } from 'react-native';

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
  $textOffset1Rem:
    Platform.OS === 'ios'
      ? screenHeight > 800 ? 6 : screenHeight > 600 ? 5 : 4
      : screenHeight > 800 ? -2 : screenHeight > 600 ? -1 : 0,
  $textOffset1_25Rem:
    Platform.OS === 'ios'
      ? screenHeight > 800 ? 7 : screenHeight > 600 ? 5.5 : 4.5
      : screenHeight > 800 ? -2.5 : screenHeight > 600 ? -1 : 0.5,
  $textOffset1_25Rem_impact:
    Platform.OS === 'ios'
      ? screenHeight > 800 ? 0 : screenHeight > 600 ? -0.5 : -0.5
      : screenHeight > 800 ? -1 : screenHeight > 600 ? -1 : -0.5,

  $textOffset1_5Rem:
    Platform.OS === 'ios'
      ? screenHeight > 800 ? 8 : screenHeight > 600 ? 6.5 : 5.5
      : screenHeight > 800 ? -2.5 : screenHeight > 600 ? -1.5 : -0.5,
  $textOffset2Rem:
    Platform.OS === 'ios'
      ? screenHeight > 800 ? 10 : screenHeight > 600 ? 8 : 6.5
      : screenHeight > 800 ? -3 : screenHeight > 600 ? -2 : -1,
};

export default globalStyles;
