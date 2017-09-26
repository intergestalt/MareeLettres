const Integer = 'Integer';

const systemConfigDefaults = {
    proposals_auto_accept: {
        defaultValue: false,
        type: Boolean,
        title: 'Auto-Accept new proposals, bypass review process',
        systems: ['server']
    },
    proposal_boost_amount: {
        defaultValue: 5,
        type: Integer,
        title: 'The boost in number of positive votes a proposal gets when a proposal with the same text is submitted',
        systems: ['app', 'server']
    },
    track_player_movements: {
        defaultValue: true,
        type: Boolean,
        title: 'Constantly update player positions on map',
        systems: []
    },
    tinder_proposals_regeneration_interval: {
        defaultValue: 300,
        type: Integer,
        title: 'Interval at which TinderProposals get regenerated on Server (seconds)',
        systems: ['server']
    },
    trending_regeneration_interval: {
        defaultValue: 60,
        type: Integer,
        title: 'Interval at which Trends get calculated on Server (seconds)',
        systems: ['server']
    },
    winner_election_interval: {
        defaultValue: 5,
        type: Integer,
        title: 'Interval at which the server looks for finished challenges (seconds)',
        systems: ['server', 'app']
    },
    trend_damping_halflife_time: {
        defaultValue: 120,
        type: Number,
        title: 'Damping of trend changes: time in seconds after which half of the impact of a change will be gone',
        systems: ['server']
    },
    archive_letters_interval: {
        defaultValue: 60,
        type: Integer,
        title: 'Interval at which Letters are archived (seconds)',
        systems: ['server']
    },
    map_update_interval: {
        defaultValue: 10,
        type: Integer,
        title: 'Map: Update interval when map screen is open (seconds)',
        systems: ['app']
    },
    map_cache_update_interval: {
        defaultValue: 10,
        type: Integer,
        title: 'Map Server: How often te refresh the map letters cache (should be lower than map_update_interval). Lower value yields more load on database, but creates less network traffic.',
        systems: ['server']
    },
    map_query_update_latency: {
        defaultValue: 1,
        type: Integer,
        title: 'Map Server: How long it takes to query the database (seconds)',
        systems: ['server']
    },
    map_letter_decay_time: {
        defaultValue: 5000,
        type: Integer,
        title: 'Map: Letter Decay Time (seconds)',
        systems: ['app', 'server']
    },
    map_letter_regeneration_time_primary: {
        defaultValue: 5,
        type: Integer,
        title: 'Map: Regeneration time of Primary Letter (seconds)',
        systems: ['app']
    },
    map_letter_regeneration_time_secondary: {
        defaultValue: 5,
        type: Integer,
        title: 'Map: Regeneration time of Secondary Letters (seconds)',
        systems: ['app']
    },
    map_letter_transfer_timeout: {
        defaultValue: 60,
        type: Integer,
        title: 'Map: For how long a letter share QR code is valid',
        systems: []
    },
    map_drop_zone_radius: {
        defaultValue: 75,
        type: Integer,
        title: 'Map: Radius of the drop zone in meters',
        systems: ['app']
    },
    map_min_zoom_level: {
        defaultValue: 0,
        type: Integer,
        min: 0,
        max: 19,
        title: 'Map: Minimum Zoom Level (NOTE: this is not used to set initial zoom, use map_delta_initial)',
        systems: ['app']
    },
    map_max_zoom_level: {
        defaultValue: 20,
        type: Integer,
        min: 1,
        max: 20,
        title: 'Map: Maximum Zoom Level',
        systems: ['app']
    },
    map_letter_base_size: {
        defaultValue: 10,
        type: Number,
        title: 'Map: Letter size in meters',
        systems: ['app', 'web']
    },
    map_delta_initial: {
        defaultValue: 2.5,
        type: Number,
        min: 0,
        max: 10,
        title: 'Map: map zoom relative to dropzone size, 1 = drop zone is fullscreen',
        systems: ['app']
    },
    map_delta_max: {
        defaultValue: 9,
        type: Number,
        min: 1,
        max: 20,
        title: 'Map: maximum map zoom relative to drop zone size',
        systems: ['app']
    },
    map_max_markers: {
        defaultValue: 50,
        type: Integer,
        title: 'Map: maximum number of letters to render as markers on map',
        systems: ['app']
    },
    map_primary_letter_reset: {
        defaultValue: 1440,
        type: Integer,
        title: 'Map: time after which primary letter can be reset (in minutes)',
        systems: ['app']
    },
    map_default_center_lng: {
        defaultValue: 2.343254,
        type: Number,
        title: 'Center of the game. Used when no GPS available, for seeding and more.',
        systems: ['app', 'server', 'web']
    },
    map_default_center_lat: {
        defaultValue: 48.858141,
        type: Number,
        title: 'Center of the game. Used when no GPS available, for seeding and more.',
        systems: ['app', 'server', 'web']
    },
    map_seeding_radius: {
        defaultValue: 100,
        type: Integer,
        title: 'Letter seeding radius in meters. 0 to disable',
        systems: ['server']
    },
    map_seeding_interval:
    {
        defaultValue: 10,
        type: Integer,
        title: 'Letter seeding interval in seconds. 0 to disable,',
        systems: ['server']
    },
    map_seeding_lpm:
    {
        defaultValue: 10,
        type: Integer,
        title: 'Letter seeding - letters per minute.',
        systems: ['server']
    },
    network_latency: {
        defaultValue: 2,
        type: Integer,
        title: 'Extra time to compensate network latency in delays and calculations (seconds)',
        systems: ['app', 'server']
    },
    send_internal_votes_after: {
        defaultValue: 5,
        type: Integer,
        title: 'Interval in which votes are (re-)sent (seconds)',
        systems: ['app', 'server']
    },
    suggestions_close_earlier: {
        defaultValue: 900,
        type: Integer,
        title: 'Submission of proposals ends before the end of the voting by this amount of seconds',
        systems: ['app']
    },
    delay_db_call: {
        defaultValue: 10000,
        type: Integer,
        title: 'Interval in which calls to new config and finished challenge are randomly distributed to prevent DDOS (milliseconds)',
        systems: ['app']
    },
    delay_db_call_offset: {
        defaultValue: 1000,
        type: Integer,
        title: 'Additional time to wait when challenge finished before reload = <time for db write> + <time to clear the cache> (milliseconds)',
        systems: ['app']
    },
    update_challenges_after: {
        defaultValue: 100000,
        type: Integer,
        title: 'Maximum time after which challenges are reloaded (milliseconds)',
        systems: ['app']
    },
    update_proposals_after: {
        defaultValue: 100000,
        type: Integer,
        title: 'Maximum time after which Proposals are reloaded (milliseconds)',
        systems: ['app']
    },
    update_content_after: {
        defaultValue: 100000,
        type: Integer,
        title: 'Maximum time after which Content is reloaded (milliseconds)',
        systems: ['app']
    },
    stream_twitter_handle: {
        defaultValue: 'http://sebquack.perseus.uberspace.de/maree/TwitterWebView.html',
        type: String,
        title: 'Stream: The twitter handle',
        systems: ['app', 'server', 'web']
    },
    challenge_list_image_url: {
        defaultValue: 'http://sebquack.perseus.uberspace.de/maree/title.jpg',
        type: String,
        title: 'Image for topic list',
        systems: ['app', 'web']
    }
};

export default systemConfigDefaults;
