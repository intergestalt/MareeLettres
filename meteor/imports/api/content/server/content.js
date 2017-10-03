import { Meteor } from 'meteor/meteor';
import { Content } from '../content';

Meteor.publish(
  'get.content',
  function getContent() {
    if (!this.userId) return;
    return Content.find();
  },
  {
    url: `${Meteor.settings.public.api_prefix}content`,
  },
);

// ; charset=utf-8

JsonRoutes.add('get', `${Meteor.settings.public.api_prefix}content`, function (req, res, next) {
  JsonRoutes.sendResult(res, {
    data: { content: Content.find().fetch() },
    headers: { 'Surrogate-Key': 'content' },
  });
});
