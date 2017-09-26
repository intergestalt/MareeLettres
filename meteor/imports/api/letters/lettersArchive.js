import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { LettersSchema } from './schema';

const LettersArchive = new Mongo.Collection('letters_archive', {
  transform: doc => ({ coords: { lng: doc.loc.coordinates[0], lat: doc.loc.coordinates[1] }, ...doc, loc: undefined }), // transform legacy coord pairs to coords onbject
});

LettersArchive.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

if (Meteor.isServer) {
  LettersArchive.rawCollection().createIndex({ loc: '2dsphere' });
}
export { LettersArchive, LettersSchema };
