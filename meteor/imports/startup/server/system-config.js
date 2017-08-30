import { Meteor } from 'meteor/meteor';
import hash from 'object-hash';

import { SystemConfig, SystemConfigSchema } from '../../api/systemConfig/systemConfig';

const interval = 5;
let updated_at = new Date();
let cached_at = new Date();
let current = SystemConfigSchema.clean({});
let digest = hash.sha1(current);

let db_digest = 0;

class SysConf {
  constructor() {
    console.log(`start system config polling (every ${interval}s)`);
    console.log(`initial config digest: ${digest}`);
    Meteor.setInterval(this.update, interval * 1000);
    this.update();
  }

  update() {
    const query = {}; // TODO: acitve:true or whatever way to chose the current config

    const meta = SystemConfig.findOne(query, { fields: { _id: 1, updated_at: 1, name: 1 } });

    if (!meta) {
      console.log('no config available in db');
      return; // nothing there, nothing to do
    }

    const new_db_digest = hash(meta);

    if (new_db_digest === db_digest) {
      return; // nothing changed, nothing to do
    }

    const result = SystemConfig.findOne(query, { fields: { _id: 0, name: 0 } });

    console.log('reloading system config.');

    if (result) {
      current = current;
      cached_at = new Date();
      updated_at = new Date(); // TODO: update and extract last changed date
      digest = hash.sha1(current);
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

const currentSystemConfig = new SysConf();

export default currentSystemConfig;
