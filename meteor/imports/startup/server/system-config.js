import { Meteor } from 'meteor/meteor';
import hash from 'object-hash';
import _ from 'underscore';
import { systemConfigDefaults } from 'maree-lettres-shared';

import buildConfig from '../both/build-config';
import { SystemConfig, SystemConfigSchema } from '../../api/systemConfig/systemConfig';

const interval = 5;

// the digest for the app only includes values relevant for the app
const app_digest = conf => hash.sha1(_.pick(conf, (item, key) => {
  const s = SystemConfigSchema._schema;
  return s[key] && s[key].systems && s[key].systems.indexOf('app') > -1;
}));

let updated_at = new Date();
let cached_at = new Date();
let current = SystemConfigSchema.clean({});
let digest = app_digest(current);

let db_digest = 0;

class SysConf {
  constructor() {
    console.log(`start system config polling (every ${interval}s)`);
    console.log(`initial config digest: ${digest}`);
    Meteor.setInterval(this.update, interval * 1000);
    this.update();
  }

  update() {
    const q = buildConfig.currentSystemConfigQuery

    const meta_query = SystemConfig.find(q.relaxed.selector, { ...q.relaxed.options, fields: { _id: 1, updated_at: 1, name: 1 } });

    if (meta_query.count() === 0) {
      console.log('no config available in db');
      return; // nothing there, nothing to do
    }

    const meta = meta_query.fetch()[0];
    const new_db_digest = hash(meta);

    if (new_db_digest === db_digest) {
      return; // nothing changed, nothing to do
    }

    const result_query = SystemConfig.find(q.relaxed.selector, { ...q.relaxed.options, fields: { _id: 0, name: 0, active: 0 } });

    console.log('reloading system config.');

    if (result_query.count() === 0) {
      console.log('error reloading system config.');
      return;
    }

    const result = result_query.fetch()[0]

    if (result) {
      current = result;
      cached_at = new Date();
      updated_at = result.updated_at;
      digest = app_digest(current);
      db_digest = new_db_digest;

      console.log(`updated system config, name "${meta.name}", new digest: ${digest}`);
      console.log(current);
    } else {
      console.log('config retrieval failed');
    }
  }

  getConfig() {
    return current;
  }

  getInterval() {
    return interval;
  }

  getUpdatedAt() {
    return updated_at;
  }

  addToResponseOptions(options) {
    if (!options.data) {
      options.data = {};
    }

    options.data.config = current;

    return options;
  }

  addUpdatedAtToResponseOptions(options) {
    if (!options.data) {
      options.data = {};
    }

    options.data.current_config = digest;

    return options;
  }

  responseDataProperties() {
    return {
      current_config: digest,
    };
  }

}

// check integrity

console.log('Checking integrity of system config definitions');

const default_keys = new Set(Object.keys(SystemConfigSchema.clean({})));
const shared_keys = new Set(Object.keys(systemConfigDefaults).concat(['name', 'active']));
const not_in_shared = new Set([...default_keys].filter(x => !shared_keys.has(x)));
const not_in_schema = new Set([...shared_keys].filter(x => !default_keys.has(x)));
not_in_schema.forEach((item) => {
  console.log('SystemConfig WARN: ' + item + ' is not in schama');
})
not_in_shared.forEach((item) => {
  console.log('SystemConfig WARN: ' + item + ' is not in shared module');
})


const currentSystemConfig = new SysConf();

export default currentSystemConfig;
