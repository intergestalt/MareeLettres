import { Meteor } from 'meteor/meteor';

import { SystemConfig, SystemConfigSchema } from '../../api/systemConfig/systemConfig';

const interval = 5;

class SysConf {
  constructor() {
    console.log(`start system config polling (every ${interval}s)`);
    Meteor.setInterval(this.update, interval * 1000);
    this.update();
  }

  update() {
    let current = SystemConfig.findOne({}, { fields: { _id: 0, name: 0 } });

    if (!current) {
      console.log('system config retrieval failed. using default config.');
      current = SystemConfigSchema.clean({});
    }

    global.currentSystemConfig = current;
  }
}

const s = new SysConf();
