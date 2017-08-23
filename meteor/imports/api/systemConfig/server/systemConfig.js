import { Meteor } from 'meteor/meteor';
import { SystemConfig } from '../systemConfig';

Meteor.publish('get.systemConfig', function getSystemConfig() {
  return SystemConfig.find();
});

// ; charset=utf-8

JsonRoutes.add('get', `${Meteor.settings.public.api_prefix}config`, function (req, res, next) {
  JsonRoutes.sendResult(res, {
    data: global.currentSystemConfig,
  });
});
