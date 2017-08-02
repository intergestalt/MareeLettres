import { Mongo } from 'meteor/mongo';
import Textarea from 'simple-react-form-material-ui/lib/textarea';
import SimpleSchema from 'simpl-schema';

const Content = new Mongo.Collection('content');

Content.allow({
  insert: () => false,
  update: () => true,
  remove: () => false,
});

SimpleSchema.extendOptions(['srf']);

const contentSchema = new SimpleSchema({
  en: {
    type: String,
    srf: {
      type: Textarea,
    },
  },
  fr: {
    type: String,
    srf: {
      type: Textarea,
    },
  },
});
/*
contentSchema.extend({
  srf: Match.Optional(Object),
});
*/

Content.attachSchema(contentSchema);

export { Content };
