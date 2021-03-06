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
    this.props.hideMap(); // put black curtain over map to hide weird morph effect
    setTimeout(()=>{
      navigateToMapCamera(this.props);
      this.props.showMap(); // take it away when the camera is loaded
    }, 100);
  };

  render() {
    I18n.locale = this.props.language;

    return (
      <TouchableOpacity style={styles.camera__button} onPress={this.handlePress}>
        <Image
          style={styles.camera__button__image}
          source={require('./assets/camera.png')}
          resizeMode="contain"
        />
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
