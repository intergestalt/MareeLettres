const { OriginId, systemConfigInitial } = require('maree-lettres-shared');
const request = require('request-promise');
const Random = require('random-js');
var Promise = require('bluebird');

//const api_prefix = "http://localhost:3333/api/";
//const api_prefix = "https://maree-dev.herokuapp.com/api/";
const api_prefix = "https://maree-dev-herokuapp-com.global.ssl.fastly.net/api/";
const parallel = 10;
const continuous = true;

const proposal_probability = 0.1;
const map_coords_variation_probability = 0.5;
const map_interval_variation_probability = 0.5;

const log_actions = false;
const log_structure = true
const statistics = {}

const r = Random();
const r_votes = Random(Random.engines.browserCrypto);
let counter = 0;

const run_test = function (callback) {
  const device_string = "Simulator_" + Date.now() + "_" + r.hex(5, true);
  const origin_id = OriginId.generateFromString(device_string);
  if (log_structure) console.log("Simulating player " + device_string + ": " + origin_id)

  // get player
  request(api_prefix + 'players/' + origin_id)
    .then(function (data) {
      // console.log(data);
      // get challenges 
      return request(log(api_prefix + 'challenges'))
    })
    .then(function (data) {
      // console.log(data);
      // pick random challenge
      const challenges = JSON.parse(data).challenges
      challenge = r.sample(challenges, 1)[0]
      //console.log(challenge._id)
      // GET proposals
      request(log(api_prefix + 'challenges/' + challenge._id + "/proposals?sort=popular&limit=40", "get")).then(function (proposals) {
        //console.log(JSON.parse(proposals))
      })
      request(log(api_prefix + 'challenges/' + challenge._id + "/proposals?sort=newest&limit=40", "get")).then(function (proposals) {
        //console.log(JSON.parse(proposals))
      })
      request(log(api_prefix + 'challenges/' + challenge._id + "/proposals?sort=trending&limit=40", "get")).then(function (proposals) {
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
      request(log(api_prefix + 'tinder/' + challenge._id + "/" + origin_id + "?limit=100", "get_tinder")).then(function (proposals_res) {
        //console.log(JSON.parse(proposals))
        const proposals = JSON.parse(proposals_res).proposals;
        if (log_structure) console.log("got " + proposals.length + " tinder proposals")
        Promise.each(proposals, function (proposal) {
          const body = { votes: {} }
          body.votes[proposal._id] = r_votes.bool(0.6);
          // console.log(body);
          return request.post(log(api_prefix + 'players/' + origin_id + '/votes', "post_votes")).form(body)
            .then(function (vote_res) {
              //console.log('Voted', vote_res);
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
        request.post(log(api_prefix + 'proposals', "post_proposal")).form(body)
          .then(function (data) {
            console.log("proposed " + JSON.parse(data).proposal._id)
            // console.log(JSON.parse(data))
          })
      }
      return data
    })
    .then(function (data) {
      // GET letters
      let lat = systemConfigInitial.map_default_center_lat;
      let lng = systemConfigInitial.map_default_center_lng;
      let interval = null;
      if (r.bool(map_coords_variation_probability)) {
        lat += r.real(0.001, -0.001);
        lng += r.real(0.001, -0.001);
      }
      if (r.bool(map_interval_variation_probability)) {
        interval = Math.pow(r.integer(1, 8), 2);
      }
      return request(log(api_prefix + `letters?centerLat=${lat}&centerLng=${lng}&interval=${interval}`, "get_letters"))
        .then(function (letters) {
          //console.log(letters)
          if (log_structure) console.log("got " + JSON.parse(letters).letters.length + " letters")
        })
    })
    .catch(function (e) {
      console.log(e.message)
    })
    .finally(function (data) {
      if (log_structure) console.log("done " + device_string)
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

function log(string, type) {
  if (log_actions) {
    console.log(string)
  }
  if (string && type) {
    statistics[type] = 1 + statistics[type] || 0
  }
  return string
}

setInterval(() => {
  if (typeof pastStatistics === "object") {
    for (let i in statistics) {
      console.log(i + " per sec = " + (statistics[i] - pastStatistics[i]))
    }
  }
  console.log(statistics)
  pastStatistics = Object.assign({}, statistics);
}, 1000)