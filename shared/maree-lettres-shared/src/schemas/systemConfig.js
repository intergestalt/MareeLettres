import SimpleSchema from 'simpl-schema';

SimpleSchema.extendOptions(['description']);

const SystemConfigSchema = new SimpleSchema(
  {
    name: {
      type: String,
      defaultValue: 'default'
    },
    proposals_auto_accept: {
      type: Boolean,
      defaultValue: true,
      description: 'Auto-Accept new proposals, bypass review process'
    },
    track_player_movements: {
      type: Boolean,
      defaultValue: true,
      description: 'Constantly update player positions on map'
    },
    tinder_proposals_regeneration_interval: {
      type: SimpleSchema.Integer,
      defaultValue: 300,
      description: 'Interval at which TinderProposals get regenerated on Server (seconds)'
    },
    map_update_interval: {
      type: SimpleSchema.Integer,
      defaultValue: 10,
      description: 'Map: Update interval when map screen is open'
    },
    map_update_latency: {
      type: SimpleSchema.Integer,
      defaultValue: 2,
      description: 'Map Server: Extra time to compensate network latency'
    },
    map_cache_update_interval: {
      type: SimpleSchema.Integer,
      defaultValue: 10,
      description: 'Map Server: How often te refresh the map letters cache (<= map_update_interval)'
    },
    map_query_update_latency: {
      type: SimpleSchema.Integer,
      defaultValue: 1,
      description: 'Map Server: How long it takes to query the database'
    },
    map_letter_decay_time: {
      type: SimpleSchema.Integer,
      defaultValue: 300,
      description: 'Map: Letter Decay Time (seconds)'
    },
    map_letter_regeneration_time_primary: {
      type: SimpleSchema.Integer,
      defaultValue: 5,
      description: 'Map: Regeneration time of Primary Letter (seconds)'
    },
    map_letter_regeneration_time_secondary: {
      type: SimpleSchema.Integer,
      defaultValue: 5,
      description: 'Map: Regeneration time of Secondary Letters (seconds)'
    },
    map_letter_transfer_timeout: {
      type: SimpleSchema.Integer,
      defaultValue: 60,
      description: 'Map: For how long a letter share QR code is valid'
    },
    map_drop_zone_radius: {
      type: Number,
      defaultValue: 10,
      description: 'Map: Radius of the drop zone in meters'
    }
  },
  { clean: { getAutovalues: true } }
);

export { SystemConfigSchema };
