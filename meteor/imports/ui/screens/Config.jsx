import React, { Component } from 'react';
import { createContainer } from 'react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router';
import AutoFields from 'uniforms-unstyled/AutoFields';
import AutoField from 'uniforms-unstyled/AutoField';
import AutoForm from 'uniforms-unstyled/AutoForm';
import SubmitField from 'uniforms-unstyled/SubmitField';
import ErrorsField from 'uniforms-unstyled/ErrorsField';
import Alert from 'react-s-alert';
import _ from 'underscore';

import AdminWrapper from '../components/AdminWrapper';
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

  renderConfig(config) {
    const formRef = {};

    /* configs.map(config =>
     );*/

    const schema_with_keys =
      _.mapObject(SystemConfigSchema._schema, (item, key) => ({ ...item, key }));

    delete schema_with_keys.name;
    delete schema_with_keys.active;

    const sort_order = ['server', 'app', 'web'];

    const field_groups =
      _.pairs(
        _.groupBy(schema_with_keys, field =>
          field.systems.sort((a, b) =>
            sort_order.indexOf(a) - sort_order.indexOf(b),
          ).join(', '),
        ),
      );

    const field_groups_sorted = _.sortBy(field_groups, (item) => (item[0].indexOf(sort_order[0]))).reverse();

    console.log(field_groups, field_groups_sorted);

    const fields = field_groups_sorted.map((item) => {
      const title = item[0];
      const fields = item[1].map((field) => {
        return <AutoField key={field.key} name={field.key} />;
      });
      return (
        <fieldset key={title}>
          <legend>{title}</legend>
          <div>
            {fields}
          </div>
        </fieldset>);
    });

    return (
      <li key={config._id} >
        <h2>
          {config.name}
        </h2>
        <AutoForm ref={ref => formRef[config._id] = ref} className={this.configFormClassName(config)} schema={SystemConfigSchema} onSubmit={doc => this.save(doc)} model={config}>

          <div className="header">
            <AutoField name="name" />
            <AutoField name="active" />
          </div>
          {fields}
          <ErrorsField />
          <SubmitField />
          <span className="button" onClick={() => this.setCoordinatesFromDevice(formRef[config._id])}>Set coordinates from Device</span>
          <span className="button" onClick={() => formRef[config._id].reset()}>Reset </span>
          <span className="button delete" onClick={() => this.handleDelete(config)}>Delete</span>
        </AutoForm>
      </li>);
  }

  renderConfigs() {
    const configs = this.props.configs;

    return configs.map(config =>
      this.renderConfig(config)
    );
  }

  render() {
    return (
      <AdminWrapper>
        <ul className="configPage">
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
