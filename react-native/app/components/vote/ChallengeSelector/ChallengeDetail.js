import React, { Component, PropTypes } from 'react';
import { View } from 'react-native';
import { ChallengeHeader, ChallengeContent, ChallengeFooter } from './';
import styles from './styles';

class ChallengeDetail extends Component {
  static propTypes = {
    layoutCallback: PropTypes.func,
    type: PropTypes.number,
    challenges: PropTypes.array,
    challengeIndex: PropTypes.number,
    language: PropTypes.string,
    onHeaderPress: PropTypes.func,
    onUpPress: PropTypes.func,
    onDownPress: PropTypes.func,
    panResponder: PropTypes.object,
  };
  render() {
    let colorHeader = '#FF0000';
    let colorContent = '#00FF00';
    let colorFooter = '#0000FF';
    if (this.props.type === 0) {
      colorHeader = '#AA0000';
      colorContent = '#00AA00';
      colorFooter = '#0000AA';
    } else if (this.props.type === 1) {
      colorHeader = '#550000';
      colorContent = '#005500';
      colorFooter = '#000055';
    }

    return (
      <View style={styles.detailContainer}>
        <ChallengeHeader
          panResponder={this.props.panResponder}
          challenges={this.props.challenges}
          challengeIndex={this.props.challengeIndex}
          backgroundColor={colorHeader}
          layoutCallback={this.props.layoutCallback}
          onHeaderPress={this.props.onHeaderPress}
          onDownPress={this.props.onDownPress}
          onUpPress={this.props.onUpPress}
          language={this.props.language}
        />
        <ChallengeContent
          challenges={this.props.challenges}
          challengeIndex={this.props.challengeIndex}
          backgroundColor={colorContent}
        />
        <ChallengeFooter
          challenges={this.props.challenges}
          challengeIndex={this.props.challengeIndex}
          backgroundColor={colorFooter}
        />
      </View>
    );
  }
}
export default ChallengeDetail;
