import React, { PropTypes, Component } from 'react';
import { View, Text, Button } from 'react-native';
import { connect } from 'react-redux';

import { BackSimple } from '../../general/BackButton';

import styles from './styles';

import { navigateToMapOverview } from '../../../helper/navigationProxy';
import { getUserLetterProxy } from '../../../helper/userHelper';

class LetterSelectorWindow extends Component {
  static propTypes = {
    navigation: PropTypes.object,
    myLetter: PropTypes.string,
  };

  onPress = () => {
    getUserLetterProxy();
    navigateToMapOverview(this.props);
  };

  handleBackPress() {
    navigateToMapOverview(this.props);
  }

  render() {
    return (
      <View style={styles.container}>
        <BackSimple onPress={() => this.handleBackPress()} />
        <Text style={styles.text}>
          My letter is: {this.props.myLetter}
        </Text>
        <Button title={'Get random letter !'} onPress={this.onPress} />
        <Text>Todo: replace with keyboard component</Text>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  try {
    const myLetter = state.user.primary_letter.character;

    return {
      myLetter,
    };
  } catch (e) {
    console.log('LetterSelectorWindow');
    console.log(e);
    throw e;
  }
};

export default connect(mapStateToProps)(LetterSelectorWindow);
