import React, { Component, PropTypes } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { deleteLettersProxy, wipeLetterMenuProxy } from '../../../helper/userHelper';
import { navigateToQRCodeGet, navigateToQRCodeSend } from '../../../helper/navigationProxy';
import styles from './styles';

class MapScreenMenu extends Component {
  static propTypes = {
    navigation: PropTypes.object,
  }

  handleShare = () => {
    navigateToQRCodeSend(this.props);
  }

  handleGet = () => {
    navigateToQRCodeGet(this.props);
  }
  
  handleTrash = () => {
    deleteLettersProxy();
    wipeLetterMenuProxy();
  }

  render() {
    return (
      <View style={styles.menu__container}>
        <TouchableOpacity style={styles.menu__item} onPress={this.handleShare}>
          <Text style={styles.menu__text}>
            Share Your Letter
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menu__item} onPress={this.handleGet}>
          <Text style={styles.menu__text}>
            Get Letters
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.menu__item, styles.menu__item__last]} onPress={this.handleTrash}>
          <Text style={styles.menu__text}>
            Move Letters To Trash
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
};

export default MapScreenMenu;
