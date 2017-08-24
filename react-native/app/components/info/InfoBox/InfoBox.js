import React, { Component, PropTypes } from 'react';
import { ActivityIndicator, ScrollView, View, Text } from 'react-native';
import { connect } from 'react-redux';
import Markdown from 'react-native-simple-markdown';

import { LanguageSelector } from '../../general/LanguageSelector';
import styles from './styles';
import markdownStyles from '../../../config/markdown';
import I18n from '../../../i18n/i18n';

class InfoBox extends Component {
  static propTypes = {
    language: PropTypes.string,
    isError: PropTypes.bool,
    isLoading: PropTypes.bool,
    about: PropTypes.object,
    howto: PropTypes.object,
  };
  constructor(props) {
    super(props);
    I18n.locale = this.props.language;
  }
  render() {
    if (this.props.isError) {
      return (
        <View style={styles.container}>
          <LanguageSelector />
          <Text>ERROR</Text>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <LanguageSelector />
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.infoHeadline}>
            {I18n.t('info_howto_title')}
          </Text>
          {!this.props.isLoading
            ? <Markdown styles={markdownStyles}>
              {this.props.language === 'fr' ? this.props.howto.fr : this.props.howto.en}
            </Markdown>
            : <ActivityIndicator />}

          <Text style={styles.infoHeadline}>
            {I18n.t('info_about_title')}
          </Text>
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
    const isLoading = state.content.isLoading;
    return {
      language: state.globals.language,
      isError: state.content.isError,
      isLoading: state.content.isLoading,
      howto: state.content.content.howto,
      about: state.content.content.about,
    };
  } catch (e) {
    console.log('InfoBox');
    console.log(e); throw e;
  }
};
export default connect(mapStateToProps)(InfoBox);
