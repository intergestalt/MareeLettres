import React, { PropTypes, Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import { BackSimple } from '../../general/BackButton';

import styles from './styles';

import { dispatchBackActionToMapOverview } from '../../../helper/navigationProxy';
import { setUserLetterProxy } from '../../../helper/userHelper';
import I18n from '../../../i18n/i18n';
import { MAP_VIEWS } from '../../../consts';

import { connectAlert } from '../../../components/general/Alert';

import { setUserMapTutorialStatusProxy } from '../../../helper/userHelper';

// NOTE: THIS IS THE LETTER SELECTION SCREEN

class LetterSelectorWindow extends Component {
  static propTypes = {
    language: PropTypes.string,
    navigation: PropTypes.object,
    myLetter: PropTypes.string,
  };

  onPress = (char) => {
    setUserLetterProxy(char);
    if (this.props.user.map.tutorialStatus == 'step2') {
      this.props.alertWithType(
        'info',
        I18n.t('map_tutorial_2_title').replace('[LETTER]', char),
        I18n.t('map_tutorial_2_text'),
      );
      setUserMapTutorialStatusProxy('step3');
    }
    dispatchBackActionToMapOverview(this.props, MAP_VIEWS.OVERVIEW);
  };

  handleBackPress() {
    dispatchBackActionToMapOverview(this.props, MAP_VIEWS.OVERVIEW);
  }

  keyboard(item, i) {
    return (
      <TouchableOpacity key={i} onPress={() => this.onPress(item)}>
        <Text style={styles.key}>{item}</Text>
      </TouchableOpacity>
    );
  }

  render() {
    I18n.locale = this.props.language;
    // available letters
    let rowTop = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    let rowMid = ['K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S'];
    let rowBottom = ['T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    let rowLast = ['?', '*', ':'];

    // format
    rowTop = rowTop.map((item, i) => this.keyboard(item, i));
    rowMid = rowMid.map((item, i) => this.keyboard(item, i));
    rowBottom = rowBottom.map((item, i) => this.keyboard(item, i));
    rowLast = rowLast.map((item, i) => this.keyboard(item, i));

    return (
      <View style={styles.container}>
        <BackSimple onPress={() => this.handleBackPress()} />
        <View style={styles.text__container}>
          <Text style={styles.text}>{I18n.t('choose_your_letter').replace('[HOURS]', Math.floor(this.props.resetTime / 60))}</Text>
        </View>
        <View style={styles.keyboard}>
          <View style={styles.keyboard__row}>{rowTop}</View>
          <View style={styles.keyboard__row}>{rowMid}</View>
          <View style={styles.keyboard__row}>{rowBottom}</View>
          <View style={styles.keyboard__row}>{rowLast}</View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  try {
    const myLetter = state.user.primary_letter.character;

    return {
      user: state.user,
      language: state.globals.language,
      myLetter,
      resetTime: state.config.config.map_primary_letter_reset
    };
  } catch (e) {
    console.log('LetterSelectorWindow');
    console.log(e);
    throw e;
  }
};

export default connect(mapStateToProps)(connectAlert(LetterSelectorWindow));
