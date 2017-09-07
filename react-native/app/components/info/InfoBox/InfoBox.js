import React, { Component, PropTypes } from 'react';
import { ActivityIndicator, ScrollView, View } from 'react-native';
import { connect } from 'react-redux';
import Markdown from 'react-native-simple-markdown';

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
    howto: PropTypes.object,
  };

  handleReloadPressPress = () => {
    loadContentServiceProxy(true, false);
  };

  renderEmpty() {
    return (
      <View style={styles.container}>
        <ReloadButton textKey="reload_content" onReload={this.handleReloadPressPress} />
      </View>
    );
  }
  render() {
    I18n.locale = this.props.language;
    if (isEmptyContent(this.props.howto, this.props.about, this.props.language)) {
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
      howto: state.content.content.howto,
      about: state.content.content.about,
    };
  } catch (e) {
    console.log('InfoBox');
    console.log(e);
    throw e;
  }
};
export default connect(mapStateToProps)(InfoBox);
