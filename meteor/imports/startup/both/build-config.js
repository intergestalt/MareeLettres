export default buildConfig = {
    currentSystemConfigQuery: {
        strict: {
            selector: { active: true },
            options: { limit: 1 },
        },
        relaxed: {
            selector: {},
            options: { sort: { active: -1, updated_at: 1 }, limit: 1 },
        },
        relaxedMany: {
            selector: {},
            options: { sort: { active: -1, updated_at: 1 } },
        },
    },
    queries: {
        proposals: {
            sort: {
                popular: { score: -1, yes_votes: -1, no_votes: 1, created_at: 1, text: 1 }, // text to ensure equal ranks everywhere
                newest: { created_at: -1 },
                trending: { score_trending: -1, score: -1, created_at: -1 },
            }
        },
    },

};
