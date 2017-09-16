const systemConfigDefaults = {
    proposals_auto_accept: {
        defaultValue: false,
        title: 'Auto-Accept new proposals, bypass review process'
    },
    proposal_boost_amount: {
        defaultValue: 5,
        title: 'The boost in number of positive votes a proposal gets when a proposal with the same text is submitted'
    },
    track_player_movements: {
        defaultValue: true,
        title: 'Constantly update player positions on map'
    },
    tinder_proposals_regeneration_interval: {
        defaultValue: 300,
        title: 'Interval at which TinderProposals get regenerated on Server (seconds)'
    },
    trending_regeneration_interval: {
        defaultValue: 60,
        title: 'Interval at which Trends get calculated on Server (seconds)'
    },
    trend_damping_halflife_time: {
        defaultValue: 120,
        title: 'Damping of trend changes: time in seconds after which half of the impact of a change will be gone'
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
        title: 'Map Server: How often te refresh the map letters cache (should be lower than map_update_interval). Lower value yields more load on database, but creates less network traffic.'
    },
    map_query_update_latency: {
        defaultValue: 1,
        title: 'Map Server: How long it takes to query the database'
    },
    map_letter_decay_time: {
        defaultValue: 5000,
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
        defaultValue: 75,
        title: 'Map: Radius of the drop zone in meters'
    },
    map_min_zoom_level: {
        defaultValue: 0,
        title: 'Map: Minimum Zoom Level (NOTE: this is not used to set initial zoom, use map_delta_initial)'
    },
    map_max_zoom_level: {
        defaultValue: 20,
        title: 'Map: Maximum Zoom Level'
    },
    map_letter_base_size: {
        defaultValue: 10,
        title: 'Map: Letter size in meters'
    },
    map_delta_initial: {
        defaultValue: 2.5,
        title: 'Map: map zoom relative to dropzone size, 1 = drop zone is fullscreen'
    },
    map_delta_max: {
        defaultValue: 9,
        title: 'Map: maximum map zoom relative to drop zone size'
    },
    map_max_markers: {
        defaultValue: 50,
        title: 'Map: maximum number of letters to render as markers on map'
    },
    map_primary_letter_reset: {
        defaultValue: 1440,
        title: 'Map: time after which primary letter can be reset (in minutes)'
    },
    stream_twitter_handle: {
        defaultValue: 'http://sebquack.perseus.uberspace.de/maree/TwitterWebView.html',
        title: 'Stream: The twitter handle'
    },
    challenge_list_image_url: {
        defaultValue: 'http://sebquack.perseus.uberspace.de/maree/title.jpg',
        title: 'Image for topic list'
    }
};

export default systemConfigDefaults;
