import SimpleSchema from 'simpl-schema';
import { systemConfigDefaults } from 'maree-lettres-shared';

SimpleSchema.extendOptions(['title', 'systems']);

// translate 'Integer' to SimpleSchema.Integer
const D = systemConfigDefaults;
for (const i in systemConfigDefaults) {
  if (D[i].type === 'Integer') {
    D[i].type = SimpleSchema.Integer;
  }
}

const SystemConfigSchemaObject =
  {
    name: {
      type: String,
      defaultValue: 'default',
    },
    active: {
      type: Boolean,
      defaultValue: false,
    },
    ...D,
  };

const SystemConfigSchema = new SimpleSchema(
  SystemConfigSchemaObject,
  { clean: { getAutovalues: true } },
);

export { SystemConfigSchema };
