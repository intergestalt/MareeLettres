import React, { Component, PropTypes } from 'react';
import { ActivityIndicator, ScrollView, View, Text } from 'react-native';
import { connect } from 'react-redux';
import Markdown from 'react-native-simple-markdown';
import Expo from 'expo';

import { LanguageSelector } from '../../general/LanguageSelector';
import styles from './styles';
import markdownStyles from '../../../config/markdown';
import I18n from '../../../i18n/i18n';
import { isEmptyContent } from '../../../helper/helper';
import { ReloadButton } from '../../../components/general/ReloadButton';
import { loadContentServiceProxy } from '../../../helper/apiProxy';

class InfoBox extends Component {
  static propTypes = {
    language: PropTypes.string,
    isLoading: PropTypes.bool,
    about: PropTypes.object,
  };

  handleReloadPressPress = () => {
    loadContentServiceProxy(true, false);
  };

  renderDebugInfo() {
    const infos = Expo.Constants.manifest.version + (Expo.Constants.expoVersion ? ` (${Expo.Constants.expoVersion})` : '');
    return (
      <View>
        <Text style={styles.debugInfoText}>App Version: {infos}</Text>
      </View>
    );
  }

  renderEmpty() {
    return (
      <View style={styles.container}>
        <ReloadButton textKey="reload_content" onReload={this.handleReloadPressPress} />
      </View>
    );
  }

  render() {
    I18n.locale = this.props.language;
    if (isEmptyContent(this.props.about, this.props.language)) {
      return this.renderEmpty();
    }
    return (
      <View style={styles.container}>
        <LanguageSelector />
        <ScrollView showsVerticalScrollIndicator={false}>
          {!this.props.isLoading
            ? <Markdown styles={markdownStyles}>
              {this.props.language === 'fr' ? this.props.about.fr : this.props.about.en}
            </Markdown>
            : <ActivityIndicator />}
          {this.renderDebugInfo()}
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  try {
    return {
      language: state.globals.language,
      isLoading: state.content.isLoading,
      about: state.content.content.about,
    };
  } catch (e) {
    console.log('InfoBox');
    console.log(e);
    throw e;
  }
};
export default connect(mapStateToProps)(InfoBox);
