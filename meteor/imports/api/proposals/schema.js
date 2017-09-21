import SimpleSchema from 'simpl-schema';

const ProposalsSchemaObject = {
    origin_ids: {
        type: Array,
        index: 1,
    },
    challenge_id: {
        type: String,
        index: 1,
    },
    text: {
        type: String,
    },
    score: {
        type: SimpleSchema.Integer,
        index: 1, // TODO: check direction
        defaultValue: 0,
    },
    votes_amount: {
        type: SimpleSchema.Integer,
        index: 1, // TODO: check direction
        defaultValue: 0,
    },
    score_trending: {
        type: Number,
        index: 1, // TODO: check direction
        defaultValue: 0,
    },
    yes_votes: {
        type: SimpleSchema.Integer,
        defaultValue: 0,
    },
    no_votes: {
        type: SimpleSchema.Integer,
        defaultValue: 0,
    },
    in_review: {
        type: Boolean,
        defaultValue: false,
    },
    blocked: {
        type: Boolean,
        defaultValue: false,
    },
    created_at: {
        type: Date
    },
    reviewed_at: {
        type: Date
    }
}

const TinderProposalsSchemaObject = {
    origin_ids: {
        type: Array,
        index: 1,
    },
    challenge_id: {
        type: String,
        index: 1,
    },
    text: {
        type: String,
    },
    tinderscore: {
        type: SimpleSchema.Integer,
        index: 1, // TODO: check direction
    },
}

const ProposalsSchema = new SimpleSchema(
    ProposalsSchemaObject,
    {
        clean: { getAutovalues: true }
    }
);

const TinderProposalsSchema = new SimpleSchema(
    TinderProposalsSchemaObject,
    {}
);

export { ProposalsSchema, TinderProposalsSchema };
