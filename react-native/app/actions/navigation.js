import { loadContent } from './services/content';

// Helper

function handleLoadContentAPI(props) {
  if (props.content.isLoading) {
    console.log('Content isLoading');
    return;
  }
  if (props.content.isLoaded) {
    console.log('Content isLoaded');
    return;
  }
  props.dispatch(loadContent());
}

// Navigation

export function navigateToHowTo(props) {
  handleLoadContentAPI(props);
  props.navigation.navigate('How');
}

export function navigateToAbout(props) {
  handleLoadContentAPI(props);
  props.navigation.navigate('About');
}
