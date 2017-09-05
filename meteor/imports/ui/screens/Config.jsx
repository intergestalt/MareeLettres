import React, { Component } from 'react';
import { createContainer } from 'react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router';
import AutoFields from 'uniforms-unstyled/AutoFields';
import AutoForm from 'uniforms-unstyled/AutoForm';
import SubmitField from 'uniforms-unstyled/SubmitField';
import ErrorsField from 'uniforms-unstyled/ErrorsField';

import AdminWrapper from '../components/AdminWrapper';
import Menu from '../components/menu';
import ApiInfo from '../components/ApiInfo';

import { SystemConfig, SystemConfigSchema } from '../../api/systemConfig/systemConfig';

class ConfigPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  save(doc) {
    console.log(doc);
    const { _id, ...rest } = doc
    SystemConfig.update(doc._id, {
      $set: rest,
    });
  }

  renderConfig() {
    const configs = this.props.configs;
    return configs.map(config =>
      <li key={config._id}>
        <h2>
          {config.name}
        </h2>
        <AutoForm schema={SystemConfigSchema} onSubmit={doc => this.save(doc)} model={config}>
          <AutoFields omitFields={['_id', 'updated_at']} />
          <ErrorsField />
          <SubmitField />
        </AutoForm>
      </li>,
    );
  }

  render() {
    return (
      <AdminWrapper>
        <Menu />
        <ul>
          {this.renderConfig()}
        </ul>
        <ApiInfo path="config" />
      </AdminWrapper>
    );
  }
}


export default createContainer(() => {
  Meteor.subscribe('get.configs');

  return {
    configs: SystemConfig.find().fetch(),
  };
}, ConfigPage);
