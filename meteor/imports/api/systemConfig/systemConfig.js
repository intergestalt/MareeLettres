import { Mongo } from 'meteor/mongo';
import { SystemConfigSchema } from 'maree-lettres-shared';

const SystemConfig = new Mongo.Collection('system_config');

SystemConfig.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

export { SystemConfig, SystemConfigSchema };
