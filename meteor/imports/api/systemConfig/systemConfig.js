import { Mongo } from 'meteor/mongo';
import { SystemConfigSchema } from './schema';

const SystemConfig = new Mongo.Collection('system_config');

SystemConfig.allow({
  insert: () => false,
  update: () => (userId) => (userId || false),
  remove: () => false,
});

export { SystemConfig, SystemConfigSchema };
