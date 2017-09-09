import { Meteor } from 'meteor/meteor';
import { SystemConfig } from '../systemConfig';
import currentSystemConfig from '../../../startup/server/system-config';
import buildConfig from '../../../startup/both/build-config';

Meteor.publish('get.configs', function getSystemConfig() {
  if (!this.userId) return;

  return SystemConfig.find();
});

Meteor.publish('get.config.latest', function getSystemConfig() {
  if (!this.userId) return;

  return SystemConfig.find({}, { sort: { updated_at: 1 }, limit: 1 });
});

Meteor.publish('get.config.current', function getSystemConfig() {
  if (!this.userId) return;

  const q = buildConfig.currentSystemConfigQuery

  return SystemConfig.find(q.relaxed.selector, q.relaxed.options);
});


// ; charset=utf-8

JsonRoutes.add('get', `${Meteor.settings.public.api_prefix}config`, function (req, res, next) {
  options = {}
  options = currentSystemConfig.addToResponseOptions(options)
  JsonRoutes.sendResult(res, options);
});
