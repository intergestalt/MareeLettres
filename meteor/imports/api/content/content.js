import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import LongTextField from 'uniforms-unstyled/LongTextField';

const Content = new Mongo.Collection('content');

Content.allow({
  insert: () => false,
  update: () => true,
  remove: () => false,
});

const ContentSchema = new SimpleSchema({
  en: {
    type: String,
    uniforms: {
      component: LongTextField,
    },
  },
  fr: {
    type: String,
    uniforms: {
      component: LongTextField,
    },
  },
});

export { Content, ContentSchema };
