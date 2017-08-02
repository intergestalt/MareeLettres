import { Meteor } from 'meteor/meteor';
import { Content } from '../content';

Meteor.publish('get.content', function getStatus() {
  return Content.find();
}, {
  url: Meteor.settings.public.api_prefix + 'content',
});
