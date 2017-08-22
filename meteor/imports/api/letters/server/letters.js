import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Letters, LettersSchema } from '../letters';

Meteor.publish('get.letters', function getLetters() {
  return Letters.find();
});

// REST:

JsonRoutes.add('get', `${Meteor.settings.public.api_prefix}letters`, function (req, res, next) {
  const options = {
    data: { letters: Letters.find().fetch() },
  };

  JsonRoutes.sendResult(res, options);
});

JsonRoutes.add('post', `${Meteor.settings.public.api_prefix}letters`, function (req, res, next) {
  const letters = req.body.letters;

  if (!Array.isArray(letters) || letters.length === 0) {
    JsonRoutesError(res, 400, 'missing-letters');
  }

  // TODO validate input with LettersSchema

  const bulk = Letters.rawCollection().initializeUnorderedBulkOp();

  letters.forEach(function (letter) {
    letter.created_at = new Date();
    letter._id = new Mongo.ObjectID()._str;
    bulk.insert(letter);
  }, this);

  bulk.execute();

  /*
  letters.forEach(function (letter) {
    letter.created_at = new Date();
    Letters.insert(letter);
  }, this);
*/

  const options = {
    data: {},
  };

  JsonRoutes.sendResult(res, options);
});

const JsonRoutesError = function (res, status_code, error_code) {
  error_options = {
    code: status_code,
    data: {
      error: error_code,
    },
  };
  JsonRoutes.sendResult(res, error_options);
};
