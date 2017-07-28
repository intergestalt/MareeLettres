// https://github.com/meteorhacks/meteor-down

meteorDown.init(function (Meteor) {
  Meteor.subscribe('Challenges.pub.list', function () {
    //Meteor.subscribe('Proposals.pub.list', function () {
      //console.log('Subscription is ready');
      //console.log(Meteor.collections.challenges);
      setTimeout(()=>{
        Meteor.kill();
      },5000);
    //});
  });
});

meteorDown.run({
  concurrency: 50,
  //url: "http://localhost:3000"
  url: "http://maree.herokuapp.com"
});