import { screenHeight } from '../helper/screen';

const globalStyles = {
    $backgroundColor: '#DDDDDD',
    $backgroundColorMenuItem: 'rgb(245,132,102)',
    $highlightDraggingLetterColor: 'rgb(245,132,102)',
    $strokeWidth: screenHeight > 800 ? 4 : screenHeight > 600 ? 3 : 2,
    $proposalPaddingHorizontal: '10%',
    outline: 0, // set to 1 to see the elements boundaries
    rem: screenHeight > 800 ? 24 : screenHeight > 600 ? 20 : 16,
}

export default globalStyles