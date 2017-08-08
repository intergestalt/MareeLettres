import { Meteor } from 'meteor/meteor';
import { Letters } from '../letters';

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
