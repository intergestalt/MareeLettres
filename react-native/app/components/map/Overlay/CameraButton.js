import React, { Component, PropTypes } from 'react';
import { TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';
import { navigateToMapCamera } from '../../../helper/navigationProxy';
import styles from './styles';
import I18n from '../../../i18n/i18n';

class CameraButton extends Component {
  static PropTypes = {
    navigation: PropTypes.object,
    language: PropTypes.string,
  };

  handlePress = () => {
    navigateToMapCamera(this.props);
  };

  render() {
    I18n.locale = this.props.language;

    return (
      <TouchableOpacity style={styles.camera__button} onPress={this.handlePress}>
        <Image source={require('./assets/camera.png')} resizeMode="center" />
      </TouchableOpacity>
    );
  }
}

const mapStateToProps = (state) => {
  try {
    return {
      language: state.globals.language,
    };
  } catch (e) {
    console.log('CameraButton');
    console.log(e);
    throw e;
  }
};

export default connect(mapStateToProps)(CameraButton);
