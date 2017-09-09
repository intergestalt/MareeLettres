import React, { Component, PropTypes } from 'react';
import { AppState, View } from 'react-native';
import { connect } from 'react-redux';
import { sendInternalVotesServiceProxy } from '../../../helper/apiProxy';
import I18n from '../../../i18n/i18n';
import { connectAlert } from '../../../components/general/Alert';
import { DYNAMIC_CONFIG } from '../../../config/config';
import { setLastNetworkError, setNetworkError } from '../../../actions/general';

class AppContainer extends Component {
  static propTypes = {
    language: PropTypes.string,
    networkErrorMessageKey: PropTypes.string,
    isNetworkError: PropTypes.bool,
    alertWithType: PropTypes.func,
    lastNetworkError: PropTypes.number,
    dispatch: PropTypes.func,
  };
  constructor(props) {
    super(props);
    I18n.locale = this.props.language;
  }

  componentDidMount() {
    console.log('ADD EVENTLISTENER');
    AppState.addEventListener('change', this._handleAppStateChange);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isNetworkError && !this.props.isNetworkError) {
      const now = new Date().getTime();
      if (now - this.props.lastNetworkError > DYNAMIC_CONFIG.DISPLAY_NEXT_NETWORK_ERROR_AFTER) {
        this.props.dispatch(setLastNetworkError());
        this.props.alertWithType('custom', 'Error', I18n.t(nextProps.networkErrorMessageKey));
      } else {
        this.props.dispatch(setNetworkError(false, null));
      }
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
    const lastNetworkError = state.globals.lastNetworkError;
    return {
      networkErrorMessageKey,
      isNetworkError,
      language,
      lastNetworkError,
    };
  } catch (e) {
    console.log('AppContainer');
    console.log(e);
    throw e;
  }
};

export default connect(mapStateToProps)(connectAlert(AppContainer));
