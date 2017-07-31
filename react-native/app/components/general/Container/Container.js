import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';

const Container = ({ children, backgroundColor }) => {
  Container.propTypes = {
    children: PropTypes.any,
    backgroundColor: PropTypes.string,
  };

  const containerStyles = [styles.container];

  if (backgroundColor) {
    containerStyles.push({ backgroundColor });
  }
  return (
    <View style={containerStyles}>
      {children}
    </View>
  );
};

export default Container;
