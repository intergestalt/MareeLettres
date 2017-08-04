import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';

const Screen = ({ children }) => {
  Screen.propTypes = {
    children: PropTypes.any,
  };

  return (
    <View style={styles.screen}>
      {children}
    </View>
  );
};

export default Screen;
