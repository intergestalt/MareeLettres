function swipeUpTransition(props) {
  const { layout, position, scene } = props;
  const index = scene.index;
  const height = layout.initHeight;

  const opacity = position.interpolate({
    inputRange: [index - 1, index - 0.99, index, index + 0.99, index + 1],
    outputRange: [0, 1, 1, 0.85, 0],
  });

  const translateX = 0;
  const translateY = position.interpolate({
    inputRange: [index - 1, index, index + 1],
    outputRange: [-height, 0, 0],
  });

  return {
    opacity,
    transform: [{ translateX }, { translateY }],
  };
}

// Return Custom Interpolator if languageSelector is on top of Root. Swipe UP, not DOWN
function myRootScreenInterpolator(sceneProps) {
  if (sceneProps.index === 0 && sceneProps.scene.route.routeName === 'LanguageSelector') {
    return swipeUpTransition(sceneProps);
  }
  return null;
}

// Transition fpr rootNavigator
export function myRootTransitionConfig() {
  return {
    screenInterpolator: myRootScreenInterpolator,
  };
}
