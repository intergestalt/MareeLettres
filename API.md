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
Place a new proposal

##### request body
```
{ proposals: 
  [
    {
      challenge_id: ...
      origin_id: ...
      text: ...
      created_at: ...
    },
    ...
  ]
}
```

#### response body

OK:
```
{
proposals: [
    {
      _id: ...
    }
  ]
}
```


FAIL:
```
{
  error:...
}
```

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
