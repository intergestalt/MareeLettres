# Marre des Lettres REST API

## Implementation

### General

GET api/content

### ABC section (Voting Game)

#### GET api/challenges
Get all challenenges

#### GET api/challenges/:id
Get a challenge by challenge_id

#### GET api/challenges/:id/proposals?limit=:limit&sort=:sort
Get proposals of a challenge

##### Query Params
- (optional) :limit={Number}
- (optional) :sort={'popular'|'trending'|'newest'}

[ deprecated: GET api/challenges/:id/proposals/limit/:limit (-> change to ?limit=:limit) ]

#### GET api/proposals
do not use (get all proposals)

#### GET api/proposals/:proposal_id
get one proposal (comes in an array)

#### GET api/tinder/:challenge_id/:origin_id?limit=:limit
Get tinder proposals for a player
(currently :origin_id is ignored)

##### Query Params
- (optional) :limit={Number}

#### GET players/:origin_id
Get "player object" of a player by :origin_id

NOTE: If no entry exists, player object will be created on the fly!
NOTE2: Create a valid origin_id with OriginId.generateFromPhoneId() or OriginId.generateFromString()

##### Response Body
```
{
  "_id": "fixture_2",
  "origin_id": "572d7dc1c2cd3b6105a388f27b3d2656d45eff318f3fae",
  "created_at": "2017-09-07T15:48:51.932Z",
  "blocked": false,
  "votes": {
    proposal_id1: true,
    proposal_id2: false,
    ...
  },
  "proposals": [
    {
      "_id": "E0A6E5631B7E98D9",
      "challenge_id": "fixture_11"
    },
    ...
  ]
}
```

#### POST players/:origin_id/votes 
Post a bunch of votes of a player

##### Request Body
```
{ 
  votes: { 
    proposal_id1: true, 
    proposal_id2: false, 
    ...
  } 
}
```

##### response body

OK: 
```
{}
```

#### POST api/proposals

##### request body
```
{ proposal: 
  {
    challenge_id: ...
    origin_id: ...
    text: ...
  }
}
```

#### response body

OK:

Returns the complete proposal object. in_review is normally true, but can be false when auto_accept is on.
```
{
proposal: 
  {
    _id: ...
    in_review: ... 
  }
}
```
If another proposal with identical text already exists, the other proposals gets a boost.

```
{
  proposal:
    {
      _id: (other proposal id),
      ...
    },
  boost: 5 (for example)
}
```

FAIL:
```
{
  error:...
}
```
- missing-proposal - no proposal submitted
- already-exists - proposal for same origin_id and same challenge_id already exists
- already-submitted - has submitted the same proposal text before


### MAP (Map Game)

#### GET api/letters
Get all letters on map

#### POST api/letters 
Place letters on the map

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

#### GET api/letters?interval
Get the new letters that are placed withing the last interval. see: config -> map_update_interval
Update map by polling every map_update_interval seconds.

## (discussion / to do)

#### GET api/letters?centerLat=...&centerLng=...&radius=...
Get letters in radius

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

#### POST api/players/:player_id/letters/send
##### request body
```
{
  transnaction_id: 12345
  transaction_url: http://lettres.paris/x/12345
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

GET letters (center, width, height)
