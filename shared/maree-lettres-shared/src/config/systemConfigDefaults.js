const systemConfigDefaults = {
    proposals_auto_accept: {
        defaultValue: true,
        title: 'Auto-Accept new proposals, bypass review process'
    },
    track_player_movements: {
        defaultValue: true,
        title: 'Constantly update player positions on map'
    },
    tinder_proposals_regeneration_interval: {
        defaultValue: 300,
        title: 'Interval at which TinderProposals get regenerated on Server (seconds)'
    },
    map_update_interval: {
        defaultValue: 10,
        title: 'Map: Update interval when map screen is open'
    },
    map_update_latency: {
        defaultValue: 2,
        title: 'Map Server: Extra time to compensate network latency'
    },
    map_cache_update_interval: {
        defaultValue: 10,
        title: 'Map Server: How often te refresh the map letters cache (<= map_update_interval)'
    },
    map_query_update_latency: {
        defaultValue: 1,
        title: 'Map Server: How long it takes to query the database'
    },
    map_letter_decay_time: {
        defaultValue: 1800,
        title: 'Map: Letter Decay Time (seconds)'
    },
    map_letter_regeneration_time_primary: {
        defaultValue: 5,
        title: 'Map: Regeneration time of Primary Letter (seconds)'
    },
    map_letter_regeneration_time_secondary: {
        defaultValue: 5,
        title: 'Map: Regeneration time of Secondary Letters (seconds)'
    },
    map_letter_transfer_timeout: {
        defaultValue: 60,
        title: 'Map: For how long a letter share QR code is valid'
    },
    map_drop_zone_radius: {
        defaultValue: 50,
        title: 'Map: Radius of the drop zone in meters'
    },
    map_min_zoom_level: {
        defaultValue: 0,
        title: 'Map: Minimum Zoom Level'
    },
    map_max_zoom_level: {
        defaultValue: 20,
        title: 'Map: Maximum Zoom Level'
    },
    map_letter_base_size: {
        defaultValue: 5,
        title: 'Map: Letter size in meters'
    },
    map_delta_initial: {
        defaultValue: 2,
        title: 'Map: Initial zoom relative to drop zone size'
    },
    map_delta_max: {
        defaultValue: 10,
        title: 'Map: Maximum zoom at which player can place letters, relative to drop zone size'
    },
    stream_twitter_handle: {
        defaultValue: 'WilliamShatner',
        title: 'Stream: The twitter handle'
    }

};

export default systemConfigDefaults;
