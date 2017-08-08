import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Letters = new Mongo.Collection('letters');

Letters.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

if (Meteor.isServer) {
  Letters._ensureIndex({ coords: '2dsphere' });
}

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
  },
  createdAt: {
    type: Date,
  },
});

export { Letters, LettersSchema };
