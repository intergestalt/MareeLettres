import { screenHeight } from '../helper/screen';

const globalStyles = {
    $backgroundColor: '#DDDDDD',
    $backgroundColorMenuItem: 'rgb(245,132,102)',
    $highlightDraggingLetterColor: 'rgb(245,132,102)',
    $strokeWidth: '0.1rem',
    $proposalPaddingHorizontal: '10%',
    outline: 0, // set to 1 to see the elements boundaries
    rem: screenHeight > 800 ? 24 : screenHeight > 600 ? 20 : 16,
}

export default globalStyles