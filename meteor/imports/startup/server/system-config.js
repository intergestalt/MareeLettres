import { Meteor } from 'meteor/meteor';

import { SystemConfig } from '../../api/systemConfig/systemConfig';

const interval = 5;

class SysConf {
  constructor() {
    console.log(`start system config polling (every ${interval}s)`);
    Meteor.setInterval(this.update, interval * 1000);
    this.update();
  }

  update() {
    global.currentSystemConfig = SystemConfig.findOne({}, { fields: { _id: 0, name: 0 } });
  }
}

const s = new SysConf();
