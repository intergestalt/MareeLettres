import React, { Component, PropTypes } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { navigateToMapCamera } from '../../../helper/navigationProxy';
import styles from './styles';

class TakeButton extends Component {
    static PropTypes = {
        onPress: PropTypes.function,
    };

    render() {
        return (
            <TouchableOpacity style={styles.take__button} onPress={this.props.onPress}>
                <Text style={styles.take__button__text}>
                    TAKE PICTURE
                </Text>
            </TouchableOpacity>
        );
    }
}

export default TakeButton;
