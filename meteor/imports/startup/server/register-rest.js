// JsonRoutes.ErrorMiddleware.use(RestMiddleware.handleErrorAsJson);

JsonRoutes.setResponseHeaders({
  'Cache-Control': 'no-store',
  Pragma: 'no-cache',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With'
});

console.log(`api prefix: ${Meteor.settings.public.api_prefix}`);
