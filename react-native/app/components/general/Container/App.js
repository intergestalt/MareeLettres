import React, { Component, PropTypes } from 'react';
import { AppState, View } from 'react-native';
import { connect } from 'react-redux';
import { sendInternalVotesServiceProxy } from '../../../helper/apiProxy';
import I18n from '../../../i18n/i18n';
import { connectAlert } from '../../../components/general/Alert';

class AppContainer extends Component {
  static propTypes = {
    language: PropTypes.string,
    networkErrorMessageKey: PropTypes.string,
    isNetworkError: PropTypes.bool,
    alertWithType: PropTypes.func,
  };
  constructor(props) {
    super(props);
    I18n.locale = this.props.language;
  }
  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isNetworkError && !this.props.isNetworkError) {
      this.props.alertWithType('custom', 'Error', I18n.t(nextProps.networkErrorMessageKey));
    }
  }
  componentWillUnmount() {
    console.log('REMOVE EVENTLISTENER');
    AppState.removeEventListener('change', this._handleAppStateChange);
  }
  _handleAppStateChange = (nextAppState) => {
    if (nextAppState === 'inactive') {
      console.log('APP BECOMES INACTIVE');
      // || nextAppState === 'active') { In case of becoming active the ticker will do it.
      sendInternalVotesServiceProxy(true);
    }
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.props.children}
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  try {
    const isNetworkError = state.globals.isNetworkError;
    const networkErrorMessageKey = state.globals.networkErrorMessageKey;
    const language = state.globals.language;

    return {
      networkErrorMessageKey,
      isNetworkError,
      language,
    };
  } catch (e) {
    console.log('AppContainer');
    console.log(e);
    throw e;
  }
};

export default connect(mapStateToProps)(connectAlert(AppContainer));
