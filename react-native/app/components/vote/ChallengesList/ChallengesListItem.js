import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import I18n from '../../../i18n/i18n';

import { ChallengeHeadActive } from './';

import styles from './styles';


class ChallengesListItem extends Component {
  static propTypes = {
    data: PropTypes.object,
    onPress: PropTypes.func,
    language: PropTypes.string,
  };

  render() {
    return (
      <View style={styles.itemContainer}>
        {!this.props.data.isLoading
          ? <TouchableOpacity onPress={this.props.onPress}>
            {!this.props.data.isFinished
              ? <ChallengeHeadActive challenge={this.props.data} />
              : <View style={styles.row}>
                <Text style={styles.title}>
                  {I18n.t('challenge')} #{this.props.data.voteNum}
                </Text>
                <Text style={styles.ticker}>
                  {this.props.data.endString}
                </Text>
                <Text style={styles.title}>
                  {this.props.data.title}
                </Text>
                <Text style={styles.answer}>
                  {this.props.data.answer}
                </Text>
              </View>}
          </TouchableOpacity>
          : <View style={styles.row}>
            <Text style={styles.title}>RELOAD ITEM</Text>
          </View>}
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  try {
    const language = state.globals.language;
    return {
      language,
    };
  } catch (e) {
    console.log('ChallengesListItem');
    console.log(e);
    throw e;
  }
};
export default connect(mapStateToProps)(ChallengesListItem);
