// https://github.com/meteorhacks/meteor-down

meteorDown.init(function (Meteor) {
  Meteor.call('example-method', function (error, result) {
    Meteor.kill();
  });
});

meteorDown.run({
  concurrency: 100,
  //url: "http://localhost:3000"
  url: "http://maree.herokuapp.com"
});