import React, { Component } from 'react';
import { createContainer } from 'react-meteor-data';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { Form, Field } from 'simple-react-form';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { RaisedButton } from 'material-ui';

import { Content } from '../../api/content/content';

import Menu from '../components/menu';

class ContentPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.form = {};
  }

  handleChange(event) {
    const newState = {};
    newState[event.target.name] = event.target.value;
    this.setState(newState);
    console.log(this.state);
  }

  handleSubmit(event) {
    event.preventDefault();

    console.log(event);

    // Find the text field via the React ref
    // const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();
    /*
    Tasks.insert({
      text,
      createdAt: new Date(), // current time
    });
*/
  }

  renderContents() {
    const contents = this.props.contents;
    return contents.map(content =>
      <li key={content._id}>
        <textarea value={content.en} onChange={this.handleChange.bind(this)} />
        <textarea value={content.fr} onChange={this.handleChange.bind(this)} />
      </li>,
    );
  }

  renderContents2() {
    const contents = this.props.contents;
    return contents.map(content =>
      <li key={content._id}>
        <MuiThemeProvider>
          <div>
            <Form collection={Content} type="update" ref="form" doc={content}>
              <Field fieldName="en" />
              <Field fieldName="fr" />
            </Form>
            <RaisedButton primary label="Save" onClick={() => this.refs.form.submit()} />
          </div>
        </MuiThemeProvider>
      </li>,
    );
  }

  render() {
    return (
      <div>
        <Menu />
        <ul>
          {this.renderContents2()}
        </ul>
      </div>
    );
  }

  render0() {
    return (
      <div>
        <Menu />
        <form onSubmit={this.handleSubmit.bind(this)}>
          <ul>
            {this.renderContents()}
          </ul>
          <input type="submit" onChange={this.handleChange.bind(this)} />
        </form>
      </div>
    );
  }
}

export default createContainer(() => {
  Meteor.subscribe('get.content');

  return {
    contents: Content.find({}).fetch(),
  };
}, ContentPage);
