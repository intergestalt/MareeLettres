import { SystemConfig } from './systemConfig';

console.log('attach SystemConfig hooks');

SystemConfig.before.insert(function (userId, doc) {
  doc.updated_at = new Date();
});

SystemConfig.before.update(function (userId, doc, fieldNames, modifier, options) {
  modifier.$set = modifier.$set || {};
  modifier.$set.updated_at = new Date();
});