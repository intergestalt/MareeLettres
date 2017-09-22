import React, { Component } from 'react';
import { createContainer } from 'react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router';
import AutoFields from 'uniforms-unstyled/AutoFields';
import AutoForm from 'uniforms-unstyled/AutoForm';
import SubmitField from 'uniforms-unstyled/SubmitField';
import ErrorsField from 'uniforms-unstyled/ErrorsField';
import Alert from 'react-s-alert';

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
    }, (error, data) => {
      if (error) { alert("ERROR - NOT SAVED"); }
      else { Alert.success("saved"); }
    });
  }

  handleDelete(doc) {
    if (doc.name === "default") { Alert.error("cannot delete default"); }
    else { SystemConfig.remove(doc._id); }
  }

  handleInsert() {
    const doc = SystemConfigSchema.clean({});
    console.log(doc, "X")
    doc.name = "new"
    SystemConfig.insert(doc);
  }

  setCoordinatesFromDevice(ref) {
    navigator.geolocation.getCurrentPosition((position) => {
      ref.change('map_default_center_lat', position.coords.latitude);
      ref.change('map_default_center_lng', position.coords.longitude)
    });
  }


  configFormClassName(config) {
    return "configForm" + (config.active ? " active" : "") + (config.name == "default" ? " default" : "");
  }

  renderConfigs() {
    const configs = this.props.configs;
    const formRef = {};

    return configs.map(config =>
      <li key={config._id}>
        <h2>
          {config.name}
        </h2>
        <AutoForm ref={ref => formRef[config._id] = ref} className={this.configFormClassName(config)} schema={SystemConfigSchema} onSubmit={doc => this.save(doc)} model={config}>
          <AutoFields omitFields={['_id', 'updated_at']} />
          <ErrorsField />
          <SubmitField />
          <span className="button" onClick={() => this.setCoordinatesFromDevice(formRef[config._id])}>Set coordinates from Device</span>
          <span className="button" onClick={() => formRef[config._id].reset()}>Reset </span>
          <span className="button delete" onClick={() => this.handleDelete(config)}>Delete</span>
        </AutoForm>
      </li>,
    );
  }

  render() {
    return (
      <AdminWrapper>
        <Menu />
        <ul>
          {this.renderConfigs()}
        </ul>
        <span className="button add" onClick={this.handleInsert}>Add</span>
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
