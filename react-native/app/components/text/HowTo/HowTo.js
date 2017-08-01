import React, { Component, PropTypes } from 'react';
import { ScrollView, View } from 'react-native';
import { connect } from 'react-redux';
import Markdown from 'react-native-simple-markdown';

import I18n from '../../../i18n/i18n';
import styles from './styles';

const markdownStyles = {
  heading1: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FF0000',
  },
  link: {
    color: 'pink',
  },
  mailTo: {
    color: 'orange',
  },
  paragraph: {
    color: '#00FF00',
  },
  text: {},
};
class HowTo extends Component {
  static propTypes = {
    language: PropTypes.string,
  };
  constructor(props) {
    super(props);
    I18n.locale = this.props.language;
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Markdown styles={markdownStyles}>
            {I18n.t('text_how')}
          </Markdown>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  language: state.globals.language,
});

export default connect(mapStateToProps)(HowTo);
