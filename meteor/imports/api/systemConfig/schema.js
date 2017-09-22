import SimpleSchema from 'simpl-schema';
import { systemConfigDefaults } from 'maree-lettres-shared';

SimpleSchema.extendOptions(['title']);

const SystemConfigSchema = new SimpleSchema(
  {
    name: {
      type: String,
      defaultValue: 'default',
    },
    active: {
      type: Boolean,
      defaultValue: false,
    },
    proposals_auto_accept: {
      type: Boolean,
      ...systemConfigDefaults.proposals_auto_accept,
    },
    proposal_boost_amount: {
      type: SimpleSchema.Integer,
      ...systemConfigDefaults.proposal_boost_amount,
    },
    track_player_movements: {
      type: Boolean,
      ...systemConfigDefaults.track_player_movements,
    },
    tinder_proposals_regeneration_interval: {
      type: SimpleSchema.Integer,
      ...systemConfigDefaults.tinder_proposals_regeneration_interval,
    },
    trending_regeneration_interval: {
      type: SimpleSchema.Integer,
      ...systemConfigDefaults.trending_regeneration_interval,
    },
    trend_damping_halflife_time: {
      type: Number,
      ...systemConfigDefaults.trend_damping_halflife_time,
    },
    archive_letters_interval: {
      type: SimpleSchema.Integer,
      ...systemConfigDefaults.archive_letters_interval,
    },
    map_update_interval: {
      type: SimpleSchema.Integer,
      ...systemConfigDefaults.map_update_interval,
    },
    map_update_latency: {
      type: SimpleSchema.Integer,
      ...systemConfigDefaults.map_update_latency,
    },
    map_cache_update_interval: {
      type: SimpleSchema.Integer,
      ...systemConfigDefaults.map_cache_update_interval,
    },
    map_query_update_latency: {
      type: SimpleSchema.Integer,
      ...systemConfigDefaults.map_query_update_latency,
    },
    map_letter_decay_time: {
      type: SimpleSchema.Integer,
      ...systemConfigDefaults.map_letter_decay_time,
    },
    map_letter_regeneration_time_primary: {
      type: SimpleSchema.Integer,
      ...systemConfigDefaults.map_letter_regeneration_time_primary,
    },
    map_letter_regeneration_time_secondary: {
      type: SimpleSchema.Integer,
      ...systemConfigDefaults.map_letter_regeneration_time_secondary,
    },
    map_letter_transfer_timeout: {
      type: SimpleSchema.Integer,
      ...systemConfigDefaults.map_letter_transfer_timeout,
    },
    map_drop_zone_radius: {
      type: SimpleSchema.Integer,
      ...systemConfigDefaults.map_drop_zone_radius,
    },
    map_min_zoom_level: {
      type: SimpleSchema.Integer,
      min: 0,
      max: 19,
      ...systemConfigDefaults.map_min_zoom_level,
    },
    map_max_zoom_level: {
      type: SimpleSchema.Integer,
      min: 1,
      max: 20,
      ...systemConfigDefaults.map_max_zoom_level,
    },
    map_letter_base_size: {
      type: Number,
      ...systemConfigDefaults.map_letter_base_size,
    },
    map_delta_initial: {
      type: Number,
      min: 0,
      max: 10,
      ...systemConfigDefaults.map_delta_initial,
    },
    map_delta_max: {
      type: Number,
      min: 1,
      max: 20,
      ...systemConfigDefaults.map_delta_max,
    },
    map_max_markers: {
      type: SimpleSchema.Integer,
      min: 1,
      ...systemConfigDefaults.map_max_markers,
    },
    map_primary_letter_reset: {
      type: SimpleSchema.Integer,
      min: 1,
      ...systemConfigDefaults.map_primary_letter_reset,
    },
    map_default_center_lat: {
      type: Number,
      ...systemConfigDefaults.map_default_center_lat,
    },
    map_default_center_lng: {
      type: Number,
      ...systemConfigDefaults.map_default_center_lng,
    },
    map_seeding_radius: {
      type: Number,
      ...systemConfigDefaults.map_seeding_radius,
    },
    map_seeding_interval: {
      type: SimpleSchema.Integer,
      ...systemConfigDefaults.map_seeding_interval,
    },
    map_seeding_lpm: {
      type: SimpleSchema.Integer,
      ...systemConfigDefaults.map_seeding_lpm,
    },
    stream_twitter_handle: {
      type: String,
      ...systemConfigDefaults.stream_twitter_handle,
    },
    challenge_list_image_url: {
      type: String,
      ...systemConfigDefaults.challenge_list_image_url,
    },
  },
  { clean: { getAutovalues: true } },
);

export { SystemConfigSchema };
