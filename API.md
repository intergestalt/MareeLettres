# Marre des Lettres REST API

## implementation

### general

GET api/content

### ABC (Voting Game)

GET api/challenges

GET api/challenges/:id

GET api/challenges/:id/proposals

GET api/challenges/:id/proposals 1)
GET api/challenges/:id/proposals?limit=:limit 1)
GET api/challenges/:id/proposals?limit=:limit&sort=:sort 1) sort={popular|trending|newest}

[ deprecated: GET api/challenges/:id/proposals/limit/:limit (-> change to ?limit=:limit) ]

GET api/proposals

GET api/tinder/:challenge_id/:origin_id (currently :origin_id is ignored) 1)
GET api/tinder/:challenge_id/:origin_id?limit=:limit (currently :origin_id is ignored) 1)

GET players/:origin_id

POST players/:origin_id/votes { votes: { proposal_id1: true, proposal_id2: false, ...} }

### MAP (Map Game)

GET api/letters

## Notes

1) Can return error: challenge-not-found

## (discussion / to do)

#### POST api/letters 
POST body: 
{ letters:
  [ 
    { 
      character: "X",
      origin_id: ...,
      coords: {
        lat: ...,
        lng: ...
      },
      created_at: new Date,
    } 
  ]
}
return body OK: {}
return body FAIL: { error: "error-code" , reason: "reason of error"}
NOTE: assuming no date/time problems

#### POST api/players/:player_id/letters/send
return body:
{
  transnaction_id: 12345
  transaction_url: http://mareedeslettres.fr/x/12345
}

#### GET api/players/:player_id/letters/receive/:transaction_id
return body:
{
  letter: {
    character: "X",
    acquired_at: Date,
  }
}

#### GET api/letters?centerLat=...&centerLng=...&radius=...

#### more

GET proposal (proposal_id)

POST proposal (challenge, origin_id, text)

GET letters (center, width, height)
