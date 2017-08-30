import { Meteor } from 'meteor/meteor';
import { SystemConfig } from '../systemConfig';
import currentSystemConfig from '../../../startup/server/system-config';

Meteor.publish('get.configs', function getSystemConfig() {
  return SystemConfig.find();
});

// ; charset=utf-8

JsonRoutes.add('get', `${Meteor.settings.public.api_prefix}config`, function (req, res, next) {
  options = {}
  options = currentSystemConfig.addToResponseOptions(options)
  JsonRoutes.sendResult(res, options);
});
