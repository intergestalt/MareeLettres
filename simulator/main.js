const { OriginId } = require('maree-lettres-shared');
const request = require('request-promise');
const Random = require('random-js');
var Promise = require('bluebird');

//const api_prefix = "http://localhost:3333/api/";
const api_prefix = "https://maree-dev.herokuapp.com/api/";
const parallel = 5;
const continuous = true;
const proposal_probability = 0.01;

const r = Random();
let counter = 0;

const run_test = function (callback) {
  const device_string = "Simulator_" + Date.now() + "_" + r.hex(5, true);
  const origin_id = OriginId.generateFromString(device_string);
  console.log("Simulating player " + device_string + ": " + origin_id)

  // get player
  request(api_prefix + 'players/' + origin_id)
    .then(function (data) {
      // console.log(data);
      // get challenges 
      return request(api_prefix + 'challenges')
    })
    .then(function (data) {
      // console.log(data);
      // pick random challenge
      const challenges = JSON.parse(data).challenges
      challenge = r.sample(challenges, 1)[0]
      //console.log(challenge._id)
      // GET proposals
      request(api_prefix + 'challenges/' + challenge._id + "/proposals?sort=popular&limit=40").then(function (proposals) {
        //console.log(JSON.parse(proposals))
      })
      request(api_prefix + 'challenges/' + challenge._id + "/proposals?sort=newest&limit=40").then(function (proposals) {
        //console.log(JSON.parse(proposals))
      })
      request(api_prefix + 'challenges/' + challenge._id + "/proposals?sort=trending&limit=40").then(function (proposals) {
        //console.log(JSON.parse(proposals))
      })
      return data
    })
    .then(function (data) {
      // console.log(data);
      // pick random challenge
      const challenges = JSON.parse(data).challenges
      challenge = r.sample(challenges, 1)[0]
      //console.log(challenge._id)
      // GET tinder proposals
      request(api_prefix + 'tinder/' + challenge._id + "/" + origin_id + "?limit=100").then(function (proposals_res) {
        //console.log(JSON.parse(proposals))
        const proposals = JSON.parse(proposals_res).proposals;
        console.log("got " + proposals.length + " tinder proposals")
        Promise.each(proposals, function (proposal) {
          const body = { votes: {} }
          body.votes[proposal._id] = r.bool(0.6);
          request.post(api_prefix + 'players/' + origin_id + '/votes').form(body)
            .then(function (vote_res) {
              console.log('Voted', vote_res);
            })
            .catch(function (e) {
              console.log(e.message)
            })
        })
      })
      return data
    })
    .then(function (data) {
      // POST proposal
      let text = shuffleString(challenge.letters + "      ");
      const body = {
        proposal: {
          origin_id,
          challenge_id: challenge._id,
          text
        }
      }
      // console.log(body)
      if (r.bool(proposal_probability)) {
        request.post(api_prefix + 'proposals').form(body)
          .then(function (data) {
            console.log("proposed " + JSON.parse(data).proposal._id)
            // console.log(JSON.parse(data))
          })
      }
      return data
    })
    .catch(function (e) {
      console.log(e.message)
    })
    .finally(function (data) {
      console.log("done " + device_string)
      if (callback) callback(callback)
    })
}

for (var i = 0; i < parallel; i++) {
  run_test(continuous ? run_test : null)
}

let shuffleString = function (str) {
  return str
    .split('')
    .sort(function () {
      return 0.5 - Math.random();
    })
    .join('');
};

function delay(t) {
  return new Promise(function (resolve) {
    setTimeout(resolve, t)
  });
}