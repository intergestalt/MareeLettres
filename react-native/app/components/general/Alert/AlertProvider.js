import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import DropdownAlert from './DropdownAlert';
import styles from './styles';
import { setNetworkError } from '../../../actions/general';

class AlertProvider extends Component {
  static childContextTypes = {
    alertWithType: PropTypes.func,
    alert: PropTypes.func,
  };
  static propTypes = {
    children: PropTypes.any,
    dispatch: PropTypes.func,
  };
  constructor(props) {
    super(props);
    this.closeError = this.closeError.bind(this);
  }
  getChildContext() {
    return {
      alert: (...args) => this.dropdown.alert(...args),
      alertWithType: (...args) => this.dropdown.alertWithType(...args),
    };
  }
  closeError() {
    this.props.dispatch(setNetworkError(false, null));
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {React.Children.only(this.props.children)}
        <DropdownAlert
          closeInterval={10000}
          enableCancel={false}
          tapToCloseEnabled
          panResponderEnabled={false}
          containerStyle={styles.containerStyle}
          titleStyle={styles.titleStyle}
          messageStyle={styles.messageStyle}
          buttonStyle={styles.buttonStyle}
          onClose={this.closeError}
          ref={(ref) => {
            this.dropdown = ref;
          }}
        />
      </View>
    );
  }
}

export default connect()(AlertProvider);
