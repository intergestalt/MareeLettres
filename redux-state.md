the redux state has different sections:
- globals: Some global information like language...
- content: list of dynamic text fragments
- challenges: an array of all challenges
- challengesTicker: An object of all ticker strings for the challenges. Key: challengeId
- proposals: List of the proposals. Key: challengeId. 4 lists per challenge (tinder, trending, most, newest)
- user: User specific data.
- letters: an object containing letters (on the map)
- myLetters: an object containing letters (placed by player)

This is the structure of the state:

{
  "challenges": {
    "challenges":[{
            "_id": "fixture_1",
            "end_date": "2017-08-18T16:09:56.582Z",
            "isInternalLoading": false,     //flag for loading quiet or not.
            "isLoading": false,             //flag for displaying. False in case of quiet load
            "proposals_amount": 170,
            "start_date": "2017-08-17T16:09:56.579Z",
            "title": "Best thing about Paris?",
            "voteNum": 1,
            "votes_amount": 0,
            "proposalListMode": "most",     //most, newest or trending
            "proposalView": "list",             //list or tinder  
              "winningProposal": {  //only if winning proposal exists.
                "_id": "fixture_1_4",
                "challenge_id": "fixture_1",
                "no_votes": 0,
                "origin_id": "572d7dc1c2cd3b6141e293f8727d4c1d",
                "score": 0,
                "score_trending": 0,
                "text": "I  BGFKLXZNHHGORFBAU  AQMDTEVYK NMI PCSQPWJLO JD   SRCE",
                "votes_amount": 0,
                "yes_votes": 0,
            },
        },{
            ... //Next Challenge
        },
        ...
    ],
    "isInternalLoading": false,  //flag for loading quiet or not.
    "isLoading": false,         //flag for displaying. False in case of quiet load
    "selectedChallengeId": "fixture_6",  //null if nothing is selected
    "selectedChallengeIndex": 5,        // -1 if nothing is selected. Always synchron to Id     "challengeView": "detail",  //detail or list
    "time": 1503312576795,              // Last time this list was fetched
 },
  "challengesTicker":  {
    "fixture_1":  {
      "endStringEn": "Ended on Aug 18 at 6:09pm",
      "endStringFr": "Ended on Aug 18 at 6:09pm",
      "tickerString": "(00:00:00)",
    },
    "fixture_10":  {
        ...
    },
    ...
  },

  "content":  {
    "content":  {
      "about":  {
        "en": "english text",
        "fr": "french text",
      },
       "howto": {
           ...
       },
      ...
    },
    "isInternalLoading": false,
    "isLoading": false,
    "time": 1503313175582,
  },
  "globals": {
    "language": "fr",
  },
  "proposals":  {
    "fixture_10":  {
      "listMost":  {
        "isInternalLoading": false,
        "isLoading": false,
        "isPullDownLoading": false,
        "isPullUpLoading": false,
        "lastLimit": 15,
        "lastLoaded": 1,
        "proposals":  [{
                "_id": "fixture_10_15",
                "challenge_id": "fixture_10",
                "no_votes": 0,
                "origin_id": "572d7dc1c2cd3b6144fac4f16d234b5180",
                "score": 0,
                "score_trending": 0,
                "text": "G PMDISQJLQECOBLFTRKX  BAHN YJRNUV KES M  WGP FAZHI OCD",
                "votes_amount": 0,
                "yes_votes": 0,
            }, {
                ...
            },
            ...
        ],
        "time": 1503312575976,
      },
      "listNewest": {},
      "listTrending":  {},
      "tinder":  {},
    },
    "fixture_4":  {
      "listMost":  {},
      "listNewest":  {},
      "listTrending":  {},
      "tinder":  {},
    },
    ...
  },
  "user":  {
    "banned": false,
    "coordinates":  {
      "latitude": 52.4972,
      "latitudeDelta": 0.001,
      "longitude": 13.4377,
      "longitudeDelta": 0.001,
    },
    "created_at": "Mon, 21 Aug 2017 10:49:04 GMT",
    "last_seen": "Mon, 21 Aug 2017 10:49:04 GMT",
    "map":  {
      "coordinates":  {
        "latitude": 52.4971999206982,
        "latitudeDelta": 0.0009997610156489145,
        "longitude": 13.437699861824512,
        "longitudeDelta": 0.0015757977962493896,
      },
      "dropzone_radius": 30,
      "letters_selected":  {
        "friends":  [
          false,
          false,
          false,
          false,
        ],
        "mine": false,
      },
    },
    "origin_id": "0074438381fa6a0d588dd8bb28624d51c112a164844cee2025da6e8aaea362561d8804bcb30e96b78f8589",
    "primary_letter": {
      "acquired_at": "Mon, 21 Aug 2017 10:49:04 GMT",
      "character": "...",
      "last_used_at": "Mon, 21 Aug 2017 10:49:04 GMT",
    },
    "secondary_letters":  [{
        "acquired_at": "Mon, 21 Aug 2017 10:49:04 GMT",
        "character": "L",
        "last_used_at": "Mon, 21 Aug 2017 10:49:04 GMT",
      },{
        ...
      },
      ...
    ],
    "votes":  {
        "proposal_id":  {
            "bool": true,
         },
        "next_proposal_id":  {
            "bool": true,
         },
         ...
    }
    "internatlVotes":  {
        "proposal_id":  {
            "bool": true,
         },
        "next_proposal_id":  {
            "bool": true,
         },
         ...
    }
  },

  "challengesTicker":  {
    "fixture_1":  {
      "endStringEn": "Ended on Aug 18 at 6:09pm",
      "endStringFr": "Ended on Aug 18 at 6:09pm",
      "tickerString": "(00:00:00)",
    },
    "fixture_10":  {
        ...
    },
    ...
  },

  "letters": {
  "content":  [
        {
            "_id": "r7LZpTTBXQrxbYCDg",
            "character": "K",
            "coords": {
            "lat": 52.5171969661722,
            "lng": 13.466660195258447,
            },
        }, {
            ...
        },
        ...
    ],
    "isInternalLoading": false,
    "isLoading": false,
  },
  "myLetters": {
    "content": [],
    "isLoading": true,
  },
}
