import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import styles from './styles';

class FooterMenu extends Component {
  static propTypes = {
    isFinished: PropTypes.bool,
    isTinder: PropTypes.bool,
    handleTinderPress: PropTypes.func,
    handleListPress: PropTypes.func,
    handleSharePress: PropTypes.func,
  };

  renderFinished() {
    return (
      <View style={styles.footerMenu}>
        <TouchableOpacity onPress={this.props.handleSharePress}>
          <Text style={styles.footerMenuText}>Share</Text>
        </TouchableOpacity>
      </View>
    );
  }

  renderUnfinished() {
    return (
      <View style={styles.footerMenu2}>
        {!this.props.isTinder
          ? <TouchableOpacity onPress={this.props.handleTinderPress}>
            <Text style={styles.footerMenuText}>Swipe</Text>
          </TouchableOpacity>
          : <Text style={styles.footerMenuTextHigh}>Swipe</Text>}

        {this.props.isTinder
          ? <TouchableOpacity onPress={this.props.handleListPress}>
            <Text style={styles.footerMenuText}>List</Text>
          </TouchableOpacity>
          : <Text style={styles.footerMenuTextHigh}>List</Text>}
      </View>
    );
  }

  render() {
    if (this.props.isFinished) {
      return this.renderFinished();
    }
    return this.renderUnfinished();
  }
}
export default FooterMenu;
