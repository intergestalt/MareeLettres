import React, { Component } from 'react';
import { createContainer } from 'react-meteor-data';
import { Meteor } from 'meteor/meteor';

import AutoForm from 'uniforms-unstyled/AutoForm';
import { Content, ContentSchema } from '../../api/content/content';

import ApiInfo from '../components/ApiInfo';
import Menu from '../components/menu';

class ContentPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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

  save(doc) {
    console.log(doc);
    Content.update(doc._id, {
      $set: {
        en: doc.en,
        fr: doc.fr,
      },
    });
  }

  renderContents() {
    const contents = this.props.contents;
    return contents.map(content =>
      <li key={content._id}>
        <h2>
          {content._id}
        </h2>
        <AutoForm schema={ContentSchema} onSubmit={doc => this.save(doc)} model={content} />
      </li>,
    );
  }

  render() {
    return (
      <div>
        <Menu />
        <ul className="content_editor">
          {this.renderContents()}
        </ul>
        <ApiInfo path="content" />
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
