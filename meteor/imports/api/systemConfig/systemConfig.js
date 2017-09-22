import { Mongo } from 'meteor/mongo';
import { SystemConfigSchema } from './schema';

const SystemConfig = new Mongo.Collection('system_config');

SystemConfig.allow({
  insert: () => (userId) => (userId || false),
  update: () => (userId) => (userId || false),
  remove: () => (userId) => (userId || false),
});

export { SystemConfig, SystemConfigSchema };
