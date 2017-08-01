import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import I18n from '../../../i18n/i18n';
import styles from './styles';

class HomeIntro extends Component {
  static propTypes = {
    onVotePress: PropTypes.func,
    onMapPress: PropTypes.func,
    onStreamPress: PropTypes.func,
    onAboutPress: PropTypes.func,
    onHowPress: PropTypes.func,
    language: PropTypes.string,
  };
  constructor(props) {
    super(props);
    I18n.locale = this.props.language;
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.props.onVotePress}>
          <Text style={styles.paragraph}>
            {I18n.t('main_vote')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.props.onMapPress}>
          <Text style={styles.paragraph}>
            {I18n.t('main_map')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.props.onStreamPress}>
          <Text style={styles.paragraph}>
            {I18n.t('main_stream')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.props.onAboutPress}>
          <Text style={styles.paragraph}>
            {I18n.t('main_about')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.props.onHowPress}>
          <Text style={styles.paragraph}>
            {I18n.t('main_how')}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  language: state.globals.language,
});

export default connect(mapStateToProps)(HomeIntro);
