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

#### GET api/letters?centerLat=...&centerLng=...&radius=...
Get letters in radius

#### GET api/letters?since=:seconds
Get the new letters placed withing the last :seconds

NOTE: Choose :seconds from a limited set. For example always use 5 seconds. Or only use 5 or 10 seconds. This is to leverage caching, which happens per URL.

#### GET api/letters
The GET letters request should allow transmission of player coordinates

##### request body
```
{
  player: {
    position: {
      lat: ...,
      lng: ...
      }
   }
}
```

NOTE: this would be a PATCH request. WTF.

IDEA: Allow both verbs, GET and PATCH, but only URL-Cache GET?

#### POST api/letters 
Place a letter on the map

##### request body
```
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
```

##### response body

OK: 
```
{}
```


FAIL: 
```
{ 
  error: "error-code", 
  reason: "reason of error"
}
```
NOTE: assuming no date/time discrepancies, using UTC ISODate

#### POST api/players/:player_id/letters/send
##### request body
```
{
  transnaction_id: 12345
  transaction_url: http://mareedeslettres.fr/x/12345
}
```
#### GET api/players/:player_id/letters/receive/:transaction_id
##### response body
```
{
  letter: {
    character: "X",
    acquired_at: Date,
  }
}
```

#### more

GET proposal (proposal_id)

POST proposal (challenge, origin_id, text)

GET letters (center, width, height)
