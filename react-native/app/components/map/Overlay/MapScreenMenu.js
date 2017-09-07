import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { deleteLettersProxy, wipeLetterMenuProxy } from '../../../helper/userHelper';
import { navigateToQRCodeGet, navigateToQRCodeSend } from '../../../helper/navigationProxy';
import styles from './styles';

import I18n from '../../../i18n/i18n';

class MapScreenMenu extends Component {
  static propTypes = {
    language: PropTypes.string,
    navigation: PropTypes.object,
  };

  handleShare = () => {
    navigateToQRCodeSend(this.props);
  };

  handleGet = () => {
    navigateToQRCodeGet(this.props);
  };

  handleTrash = () => {
    // deleteLettersProxy();
    // wipeLetterMenuProxy();
  };

  render() {
    I18n.locale = this.props.language;
    return (
      <View style={styles.menu__container}>
        <TouchableOpacity style={styles.menu__item} onPress={this.handleShare}>
          <Text style={styles.menu__text}>
            {I18n.t('map_give_letter_button')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menu__item} onPress={this.handleGet}>
          <Text style={styles.menu__text}>
            {I18n.t('map_get_letter_button')}
          </Text>
        </TouchableOpacity>
        <View style={[styles.menu__item, styles.menu__item__last]} onPress={this.handleTrash}>
          <Text style={styles.menu__text}>
            {I18n.t('map_trash_letter_button')}
          </Text>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  try {
    return {
      language: state.globals.language,
    };
  } catch (e) {
    console.log('MapScreenMenu');
    console.log(e);
    throw e;
  }
};
export default connect(mapStateToProps)(MapScreenMenu);
