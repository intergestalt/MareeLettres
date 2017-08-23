import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const SystemConfig = new Mongo.Collection('system_config');

SystemConfig.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

const SystemConfigSchema = new SimpleSchema(
  {
    name: {
      type: String,
      defaultValue: 'default',
    },
    proposals_auto_accept: {
      type: Boolean,
      defaultValue: true,
      description: 'Auto-Accept new proposals, bypass review process',
    },
    track_player_movements: {
      type: Boolean,
      defaultValue: true,
      description: 'Constantly update player positions on map',
    },
    tinder_proposals_regeneration_interval: {
      type: SimpleSchema.Integer,
      defaultValue: 300,
      description: 'Interval at which TinderProposals get regenerated on Server (seconds)',
    },
    map_letter_decay_time: {
      type: SimpleSchema.Integer,
      defaultValue: 30,
      description: 'Map: Letter Decay Time (seconds)',
    },
    map_letter_regeneration_time_primary: {
      type: SimpleSchema.Integer,
      defaultValue: 5,
      description: 'Regeneration time of Primary Letter (seconds)',
    },
    map_letter_regeneration_time_secondary: {
      type: SimpleSchema.Integer,
      defaultValue: 5,
      description: 'Regeneration time of Secondary Letters (seconds)',
    },
    map_drop_zone_radius: {
      type: Number,
      defaultValue: 10,
      description: 'Radius of the drop zone in meters',
    },
  },
  { clean: { getAutovalues: true } },
);

export { SystemConfig, SystemConfigSchema };
