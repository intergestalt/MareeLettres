import React, { Component, PropTypes } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { connect } from 'react-redux';
import Markdown from 'react-native-simple-markdown';

import styles from './styles';

import markdownStyles from '../../../config/markdown';

class AboutApp extends Component {
  static propTypes = {
    language: PropTypes.string,
    isError: PropTypes.bool,
    isLoaded: PropTypes.bool,
    isLoading: PropTypes.bool,
    text: PropTypes.object,
  };

  render() {
    let string = '';
    if (this.props.isLoading) {
      string = 'Loading...';
    } else if (this.props.isError) {
      string = 'ERROR!!';
    }
    return (
      <View style={styles.container}>
        <View style={styles.about}>
          {this.props.isLoaded
            ? <ScrollView showsVerticalScrollIndicator={false}>
              <Markdown styles={markdownStyles}>
                {this.props.language === 'fr' ? this.props.text.fr : this.props.text.en}
              </Markdown>
            </ScrollView>
            : <Text>
              {string}
            </Text>}
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  language: state.globals.language,
  isError: state.content.isError,
  isLoaded: state.content.isLoaded,
  isLoading: state.content.isLoading,
  text: state.content.content.about,
});

export default connect(mapStateToProps)(AboutApp);
