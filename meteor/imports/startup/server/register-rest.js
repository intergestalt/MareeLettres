// JsonRoutes.ErrorMiddleware.use(RestMiddleware.handleErrorAsJson);

JsonRoutes.setResponseHeaders({
  'Cache-Control': 'no-store',
  Pragma: 'no-cache',
});

console.log(`api prefix: ${Meteor.settings.public.api_prefix}`);
