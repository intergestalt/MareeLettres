import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';

const Screen = ({ centerContent, customStyle, children, backgroundColor }) => {
  Screen.propTypes = {
    children: PropTypes.any,
    customStyle: PropTypes.object,
    backgroundColor: PropTypes.string,
    centerContent: PropTypes.bool,
  };

  const containerStyles = [styles.screen];
  if (backgroundColor) {
    containerStyles.push({ backgroundColor });
    containerStyles.push(customStyle);
  }
  if (centerContent) {
    containerStyles.push({ alignItems: 'center', justifyContent: 'center' });
  }
  return (
    <View style={containerStyles}>
      {children}
    </View>
  );
};

export default Screen;
