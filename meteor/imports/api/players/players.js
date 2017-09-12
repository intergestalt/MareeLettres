import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Players = new Mongo.Collection('players');

Players.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

SimpleSchema.extendOptions(['title']);

const OwnedLetterSchema = new SimpleSchema({
  character: {
    type: String,
    allowedValues: allowedOwnedCharacters,
    title: 'One uppercase character',
  },
  acquired_at: {
    type: Date,
    optional: true,
    title: 'When it was acquired - either by sharing or by choosing the primary letter',
  },
  last_used_at: {
    type: Date,
    optional: true,
    title: 'When it was last used (needed for regeneration)',
  },
});

const PlayersSchema = new SimpleSchema({
  origin_id: {
    type: String,
    index: 1,
  },
  primary_letter: {
    type: OwnedLetterSchema,
    optional: true,
    title: 'Primary Letter',
  },
  secondary_letters: {
    type: Array,
    optional: true,
    title: 'Secondary Letters',
  },
  'secondary_letters.$': OwnedLetterSchema,
  votes: {
    type: Object,
    optional: true,
    blackbox: true,
    title:
    'Object of type: { proposal_id1: value1, proposal_id2: value2, ... } e.g. { 1234: true, 1235: false }',
  },
  proposals: {
    type: Array,
    optional: true,
    title: 'Own proposals'
  },
  last_seen_at: {
    type: Date,
    optional: true,
    title: 'Update when player object gets modified',
  },
  created_at: {
    type: Date,
    optional: true,
  },
  banned: {
    type: Boolean,
    defaultValue: false,
    title: 'A banned player is banned from the MAP game',
  },
});

export { Players, PlayersSchema };

const allowedOwnedCharacters = function () {
  return 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
};

const generateSchemaInfo = function (schema, name = null, level = 1) {
  const out = [];
  schema._schemaKeys.forEach(function (k) {
    if (schema._firstLevelSchemaKeys.indexOf(k) === -1) {
      const subschema = schema._schema[k].type.definitions[0].type;
      out.push(generateSchemaInfo(subschema, null, 2));
    } else if (typeof schema._schema[k].type.definitions[0].type === 'object') {
      const type = 'Object';
      const info = schema._schema[k].title ? `# ${schema._schema[k].title}` : '';
      out.push(`${'    '.repeat(level)}- ${k} ${type} ${info}`);

      const subschema = schema._schema[k].type.definitions[0].type;
      out.push(generateSchemaInfo(subschema, null, 2));
    } else {
      const type = `_${schema._schema[k].type.definitions[0].type.name}_`;

      const info = schema._schema[k].title ? `# ${schema._schema[k].title}` : '';
      out.push(`${'    '.repeat(level)}- ${k} ${type} ${info}`);
    }
  });
  return `${name ? `- ${name}\n` : ''}${out.join('\n')}`;
};

console.log(generateSchemaInfo(PlayersSchema, 'Players'));
