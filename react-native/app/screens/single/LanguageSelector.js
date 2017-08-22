import React, { PropTypes } from 'react';
import { StatusBar, View, Text } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { LinearGradient } from 'expo';

import { Screen } from '../../components/general/Container';

const styles = EStyleSheet.create({
  container: {
    backgroundColor: 'rgb(0,0,67)',
  },
  dropzone: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingLeft: '20%',
    paddingRight: '20%',
  },
  dropzoneText: {
    color: 'white',
    opacity: 1, // animate this
    fontSize: '1rem',
    fontFamily: 'normal',
    backgroundColor: 'transparent',
    textAlign: 'center',
  },
  basezone: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
    paddingLeft: '10%',
    paddingRight: '10%',
  },
  lang: {
    backgroundColor: 'transparent',
    color: 'white',
    fontSize: '4.5rem',
    fontFamily: 'impact',
  },
  langActive: {
    transform: [{ scale: 1.2 }], // animate this
  },
});

const gradientStops = [
  0,
  0.009,
  0.1604,
  0.2193,
  0.2736,
  0.3246,
  0.3733,
  0.42,
  0.4641,
  0.5049,
  0.506,
  0.5414,
  0.5793,
  0.6209,
  0.6663,
  0.7173,
  0.7766,
  0.8524,
  1,
];

const gradientColors = [
  '#0D1140',
  '#101241',
  '#191643',
  '#261C46',
  '#36244A',
  '#4B2F4F',
  '#663D55',
  '#894F5B',
  '#B76661',
  '#F58466',
  '#F28366',
  '#C97769',
  '#AA6E6C',
  '#91676E',
  '#7D6270',
  '#6E5E70',
  '#645B71',
  '#5D5A71',
  '#5B5971',
];

const LanguageSelector = () =>
  <Screen style={styles.container} backgroundColor={styles._container.backgroundColor}>
    <LinearGradient
      colors={gradientColors}
      locations={gradientStops}
      style={{ flex: 1, opacity: 1 }}
    >
      <StatusBar hidden />
      <View style={styles.dropzone}>
        <Text style={styles.dropzoneText}>Drag here to choose your language</Text>
      </View>
      <View style={styles.basezone}>
        <Text style={[styles.lang, styles.langActive]}>FR</Text>
        <Text style={styles.lang}>EN</Text>
      </View>
    </LinearGradient>
  </Screen>;

LanguageSelector.propTypes = {
  navigation: PropTypes.object,
};

export default LanguageSelector;
