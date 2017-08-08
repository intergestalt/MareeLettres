# Marre des Lettres REST API

## implementation

### general

GET api/content

### ABC (Voting Game)

GET api/challenges

GET api/challenges/:id

GET api/challenges/:id/proposals

GET api/challenges/:id/proposals?limit=:limit

deprecated: GET api/challenges/:id/proposals/limit/:limit (-> change to ?limit=:limit)

GET api/proposals

### MAP (Map Game)

GET api/letters

## (discussion / to do)

GET proposals (challenge, limit, order)

GET proposal (proposal_id)

POST proposal (challenge, user_key)

[ GET userProposals (user_id) ]

GET tinderProposals (challenge_id, amount, user_id)

POST votes

GET letters (center, width, height)
