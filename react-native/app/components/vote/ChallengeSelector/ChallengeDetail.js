import React, { Component, PropTypes } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import { ChallengeHeader, ChallengeContent, ChallengeFooter } from './';
import styles from './styles';

class ChallengeDetail extends Component {
  static propTypes = {
    challengeOffset: PropTypes.number,
    challenges: PropTypes.array,
    selectedChallengeIndex: PropTypes.number,
    onHeaderPress: PropTypes.func,
    onUpPress: PropTypes.func,
    onDownPress: PropTypes.func,
    panResponder: PropTypes.object,
    handleSharePress: PropTypes.func,
    handleTinderPress: PropTypes.func,
    handleListPress: PropTypes.func,
    handleCommitPress: PropTypes.func,
    layoutCallback: PropTypes.func,
  };
  getChallengeIndex() {
    return this.props.selectedChallengeIndex + this.props.challengeOffset;
  }
  render() {
    // Case of this is out of range: render a buffer screen to bounce against
    if (this.getChallengeIndex() < 0 || this.getChallengeIndex() >= this.props.challenges.length) {
      return <View style={styles.detailContainerMargin} />;
    }
    return (
      <View style={styles.detailContainer}>
        <ChallengeHeader
          challengeOffset={this.props.challengeOffset}
          panResponder={this.props.panResponder}
          layoutCallback={this.props.layoutCallback}
          onHeaderPress={this.props.onHeaderPress}
          onDownPress={this.props.onDownPress}
          onUpPress={this.props.onUpPress}
        />
        <ChallengeContent challengeOffset={this.props.challengeOffset} />
        <ChallengeFooter
          challengeOffset={this.props.challengeOffset}
          handleSharePress={this.props.handleSharePress}
          handleTinderPress={this.props.handleTinderPress}
          handleListPress={this.props.handleListPress}
          handleCommitPress={this.props.handleCommitPress}
        />
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  const challenges = state.challenges.challenges;
  const selectedChallengeIndex = state.challenges.selectedChallengeIndex;
  return {
    selectedChallengeIndex,
    challenges,
  };
};
export default connect(mapStateToProps)(ChallengeDetail);
