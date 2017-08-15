import React, { PropTypes, Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

import { BackSimple } from '../../general/BackButton';

import styles from './styles';
import { navigateToMapOverview } from '../../../helper/navigationProxy';

class LetterSelectorWindow extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    myLetter: PropTypes.string,
  }

  handleBackPress() {
    navigateToMapOverview(this.props);
  }

  render() {
    return (
      <View style={styles.container}>
        <BackSimple onPress={() => this.handleBackPress()} />
        <Text style={styles.text}>My letter is: {this.props.myLetter}</Text>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  const myLetter = state.user.letter;

  return {
    myLetter
  }
}

export default connect(mapStateToProps)(LetterSelectorWindow);
