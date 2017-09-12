import React, { PropTypes, Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import { BackSimple } from '../../general/BackButton';

import styles from './styles';

import { dispatchBackActionToMapOverview } from '../../../helper/navigationProxy';
import { setUserLetterProxy } from '../../../helper/userHelper';
import I18n from '../../../i18n/i18n';
import { MAP_VIEWS } from '../../../consts';

// NOTE: THIS IS THE LETTER SELECTION SCREEN

class LetterSelectorWindow extends Component {
  static propTypes = {
    language: PropTypes.string,
    navigation: PropTypes.object,
    myLetter: PropTypes.string,
  };

  onPress = (char) => {
    setUserLetterProxy(char);
    dispatchBackActionToMapOverview(this.props, MAP_VIEWS.OVERVIEW);
  };

  handleBackPress() {
    dispatchBackActionToMapOverview(this.props, MAP_VIEWS.OVERVIEW);
  }

  keyboard(item, i) {
    return (
      <TouchableOpacity key={i} onPress={() => this.onPress(item)}>
        <Text style={styles.key}>
          {item}
        </Text>
      </TouchableOpacity>
    );
  }

  render() {
    I18n.locale = this.props.language;
    // available letters
    let rowTop = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];
    let rowMid = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'];
    let rowBottom = ['Z', 'X', 'C', 'V', 'B', 'N', 'M'];

    // format
    rowTop = rowTop.map((item, i) => this.keyboard(item, i));
    rowMid = rowMid.map((item, i) => this.keyboard(item, i));
    rowBottom = rowBottom.map((item, i) => this.keyboard(item, i));

    return (
      <View style={styles.container}>
        <BackSimple onPress={() => this.handleBackPress()} />
        <Text style={styles.text}>
          {I18n.t('choose_your_letter')}
        </Text>
        <View style={styles.keyboard}>
          <View style={styles.keyboard__row}>
            {rowTop}
          </View>
          <View style={styles.keyboard__row}>
            {rowMid}
          </View>
          <View style={styles.keyboard__row}>
            {rowBottom}
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  try {
    const myLetter = state.user.primary_letter.character;

    return {
      language: state.globals.language,
      myLetter,
    };
  } catch (e) {
    console.log('LetterSelectorWindow');
    console.log(e);
    throw e;
  }
};

export default connect(mapStateToProps)(LetterSelectorWindow);
