# Marre des Lettres REST API

## implementation

ALL REQUESTS PREFIXED WITH `api/`

### BIG letters

GET challenges/

GET challenges/:id/

GET challenges/:id/proposals/

GET challenges/:id/proposals/limit/:limit (note -> may change to ?limit=:limit)

GET proposals/

### gps

-

## (discussion)

GET challenges

GET challenges/challenge_id

GET proposals (challenge, limit, order)

GET proposal (proposal_id)

POST proposal (challenge, user_key)

[ GET userProposals (user_id) ]

GET tinderProposals (challenge_id, amount, user_id)

POST votes



GET letters (coordinates)