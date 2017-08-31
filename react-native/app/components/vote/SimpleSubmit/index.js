import React, { Component } from 'react';
import { AppRegistry, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import { postProposalServiceProxy } from '../../../helper/apiProxy';

class SimpleSubmit extends Component {
  constructor(props) {
    super(props);
    this.state = {text: ''};
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit() {
    console.log("submitting...");
    console.log(this.state);
    postProposalServiceProxy(this.props.challenge._id, this.state.text)
  }

  render() {
    return (
      <View style={{padding: 10, width: '100%'}}>
        
        
        <TextInput
          style={{height: 40, width: '100%'}}
          placeholder="Type your proposal here"
          onChangeText={(text) => this.setState({text})}
        />
        <TouchableOpacity onPress={this.onSubmit}>
          <Text>Submit</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  try {
    const user = state.user;
    return {
      user
    };
  } catch (e) {
    console.log('SimpleSubmit');
    console.log(e);
    throw e;
  }
};
export default connect(mapStateToProps)(SimpleSubmit);



