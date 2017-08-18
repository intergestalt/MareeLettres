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

GET proposals (challenge, limit, order)

GET proposal (proposal_id)

POST proposal (challenge, user_key)

[ GET userProposals (user_id) ]

GET tinderProposals (challenge_id, amount, user_id)

POST votes

GET letters (center, width, height)
