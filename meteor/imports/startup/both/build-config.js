export default buildConfig = {
    currentSystemConfigQuery: {
        strict: {
            selector: { active: true },
            options: { limit: 1 }
        },
        relaxed: {
            selector: {},
            options: { sort: { active: -1, updated_at: 1 }, limit: 1 }
        },
        relaxedMany: {
            selector: {},
            options: { sort: { active: -1, updated_at: 1 } }
        }
    }

}