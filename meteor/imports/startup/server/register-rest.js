import { Meteor } from 'meteor/meteor';

// JsonRoutes.ErrorMiddleware.use(RestMiddleware.handleErrorAsJson);

const defaultResponseHeaders = {
  'Cache-Control': 'no-store',
  Pragma: 'no-cache',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
};

if (Meteor.settings.use_fastly) {
  defaultResponseHeaders['Surrogate-Control'] = 'max-age=300'; // 5 minutes default fastly cache
}

JsonRoutes.setResponseHeaders(defaultResponseHeaders);

console.log(`api prefix: ${Meteor.settings.public.api_prefix}`);

console.log(JsonRoutes.routes);
