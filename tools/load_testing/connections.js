// https://github.com/meteorhacks/meteor-down

let i = 0;

meteorDown.init(function (Meteor) {
  i+=1;
  console.log(i);
  setTimeout(()=>{
    console.log("kill")
    i--;
    Meteor.kill();
  },300000)
});

meteorDown.run({
  concurrency: 50,
  //url: "http://localhost:3000"
  url: "http://maree.herokuapp.com"
});