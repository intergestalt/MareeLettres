import React, { Component, PropTypes } from 'react';
import { View } from 'react-native';
import { ChallengeHeader, ChallengeContent, ChallengeFooter } from './';
import styles from './styles';

class ChallengeDetail extends Component {
  static propTypes = {
    layoutCallback: PropTypes.func,
    challenges: PropTypes.array,
    challengeIndex: PropTypes.number,
    language: PropTypes.string,
    onHeaderPress: PropTypes.func,
    onUpPress: PropTypes.func,
    onDownPress: PropTypes.func,
    panResponder: PropTypes.object,
    isTinder: PropTypes.bool,
    handleSharePress: PropTypes.func,
    handleTinderPress: PropTypes.func,
    handleListPress: PropTypes.func,
  };

  render() {
    return (
      <View style={styles.detailContainer}>
        <ChallengeHeader
          panResponder={this.props.panResponder}
          challenges={this.props.challenges}
          challengeIndex={this.props.challengeIndex}
          layoutCallback={this.props.layoutCallback}
          onHeaderPress={this.props.onHeaderPress}
          onDownPress={this.props.onDownPress}
          onUpPress={this.props.onUpPress}
          language={this.props.language}
        />
        <ChallengeContent
          challenges={this.props.challenges}
          challengeIndex={this.props.challengeIndex}
          isTinder={this.props.isTinder}
        />
        <ChallengeFooter
          challenges={this.props.challenges}
          challengeIndex={this.props.challengeIndex}
          isTinder={this.props.isTinder}
          handleSharePress={this.props.handleSharePress}
          handleTinderPress={this.props.handleTinderPress}
          handleListPress={this.props.handleListPress}
        />
      </View>
    );
  }
}
export default ChallengeDetail;
