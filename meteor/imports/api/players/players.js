import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

SimpleSchema.extendOptions(['description']);

const Players = new Mongo.Collection('players');

Players.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

const OwnedLetterSchema = new SimpleSchema({
  letter: {
    type: String,
    allowedValues: allowedOwnedCharacters,
    description: 'One uppercase character',
  },
  acquired_at: {
    type: Date,
    optional: true,
    description: 'When it was acquired - either by sharing or by choosing the primary letter',
  },
  last_used_at: {
    type: Date,
    optional: true,
    description: 'When it was last used (needed for regeneration)',
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
    description: 'Primary Letter',
  },
  secondary_letters: {
    type: Array,
    optional: true,
    description: 'Secondary Letters',
  },
  'secondary_letters.$': OwnedLetterSchema,
  votes: {
    type: Object,
    optional: true,
    blackbox: true,
    description:
      'Object of type: { proposal_id1: value1, proposal_id2: value2, ... } e.g. { 1234: true, 1235: false }',
  },
  last_seen: {
    type: Date,
    optional: true,
    description: 'Update when player object gets modified',
  },
  banned: {
    type: Boolean,
    defaultValue: false,
    description: 'A banned player is banned from the MAP game',
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
      const info = schema._schema[k].description ? `# ${schema._schema[k].description}` : '';
      out.push(`${'    '.repeat(level)}- ${k} ${type} ${info}`);

      const subschema = schema._schema[k].type.definitions[0].type;
      out.push(generateSchemaInfo(subschema, null, 2));
    } else {
      const type = `_${schema._schema[k].type.definitions[0].type.name}_`;

      const info = schema._schema[k].description ? `# ${schema._schema[k].description}` : '';
      out.push(`${'    '.repeat(level)}- ${k} ${type} ${info}`);
    }
  });
  return `${name ? `- ${name}\n` : ''}${out.join('\n')}`;
};

console.log(generateSchemaInfo(PlayersSchema, 'Players'));
