import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { LettersSchema } from './schema';

const Letters = new Mongo.Collection('letters', {
  transform: doc => ({ coords: { lng: doc.loc.coordinates[0], lat: doc.loc.coordinates[1] }, ...doc, loc: undefined }), // transform legacy coord pairs to coords onbject
});

Letters.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

if (Meteor.isServer) {
  Letters.rawCollection().createIndex({ loc: '2dsphere' });
}
export { Letters, LettersSchema };
