import React, { Component, PropTypes } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import { ChallengeHeader, ChallengeContent, ChallengeFooter } from './';
import styles from './styles';
import { CHALLENGE_VIEWS } from '../../../consts';

class ChallengeDetail extends Component {
  static propTypes = {
    challengeOffset: PropTypes.number,
    challenges: PropTypes.array,
    selectedChallengeIndex: PropTypes.number,
    onHeaderPress: PropTypes.func,
    panResponderHeader: PropTypes.object,
    handleSharePress: PropTypes.func,
    handleTinderPress: PropTypes.func,
    handleListPress: PropTypes.func,
    handleCommitPress: PropTypes.func,
    onMostPress: PropTypes.func,
    onTrendingPress: PropTypes.func,
    onNewestPress: PropTypes.func,
    setFlatlistRef: PropTypes.func,
    listEnabled: PropTypes.bool,
    handleStatusPress: PropTypes.func,
  };
  getChallengeIndex() {
    return this.props.selectedChallengeIndex + this.props.challengeOffset;
  }
  render() {
    let lineLeft = null;
    let lineRight = null;
    if (this.props.challengeOffset === -1) {
      lineLeft = <View style={styles.lineRight} />;
    }
    if (this.props.challengeOffset === 1) {
      lineRight = <View style={styles.lineLeft} />;
    }
    // Case of this is out of range: render a buffer screen to bounce against
    if (this.getChallengeIndex() < 0 || this.getChallengeIndex() >= this.props.challenges.length) {
      return <View style={styles.detailContainerMargin} />;
    }
    return (
      <View style={styles.detailContainer}>
        <ChallengeHeader
          callerViewMode={CHALLENGE_VIEWS.DETAIL}
          challengeOffset={this.props.challengeOffset}
          panResponder={this.props.panResponderHeader}
          onHeaderPress={this.props.onHeaderPress}
        />
        <View style={{ flex: 1 }}>
          <ChallengeContent
            onMostPress={this.props.onMostPress}
            onTrendingPress={this.props.onTrendingPress}
            onNewestPress={this.props.onNewestPress}
            challengeOffset={this.props.challengeOffset}
            listEnabled={this.props.listEnabled}
            setFlatlistRef={this.props.setFlatlistRef}
          />
          <ChallengeFooter
            challengeOffset={this.props.challengeOffset}
            handleSharePress={this.props.handleSharePress}
            handleTinderPress={this.props.handleTinderPress}
            handleListPress={this.props.handleListPress}
            handleCommitPress={this.props.handleCommitPress}
            handleStatusPress={this.props.handleStatusPress}
          />
          {lineLeft}
          {lineRight}
        </View>
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  try {
    const challenges = state.challenges.challenges;
    const selectedChallengeIndex = state.challenges.selectedChallengeIndex;
    return {
      selectedChallengeIndex,
      challenges,
    };
  } catch (e) {
    console.log('ChallengeDetail');
    console.log(e);
    throw e;
  }
};
export default connect(mapStateToProps)(ChallengeDetail);
