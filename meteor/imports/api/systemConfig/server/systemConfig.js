import { Meteor } from 'meteor/meteor';
import { SystemConfig } from '../systemConfig';
import currentSystemConfig from '../../../startup/server/system-config';

Meteor.publish('get.configs', function getSystemConfig() {
  if (!this.userId) return;

  return SystemConfig.find();
});

Meteor.publish('get.config.latest', function getSystemConfig() {
  if (!this.userId) return;

  return SystemConfig.find({}, { sort: { updated_at: 1 }, limit: 1 });
});

// ; charset=utf-8

JsonRoutes.add('get', `${Meteor.settings.public.api_prefix}config`, function (req, res, next) {
  options = {}
  options = currentSystemConfig.addToResponseOptions(options)
  JsonRoutes.sendResult(res, options);
});
