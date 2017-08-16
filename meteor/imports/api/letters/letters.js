import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Letters = new Mongo.Collection('letters');

Letters.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

const CoordsSchema = new SimpleSchema({
  lng: {
    type: Number,
    min: -180,
    max: 180,
  },
  lat: {
    type: Number,
    min: -90,
    max: 90,
  },
});

const LettersSchema = new SimpleSchema({
  character: {
    type: String,
  },
  coords: {
    type: CoordsSchema,
    index: '2dsphere',
  },
  createdAt: {
    type: Date,
  },
});

export { Letters, LettersSchema };
