import { callSendUserVotes } from '../helper/apiCalls';

export const USER_VOTE_INTERNAL = 'USER_VOTE_INTERNAL';
export const USER_SEND_INTERNAL_VOTES = 'USER_SEND_INTERNAL_VOTES';
export const USER_INTERNAL_VOTES_SENT = 'USER_INTERNAL_VOTES_SENT';
export const USER_SEND_INTERNAL_VOTES_ERROR = 'USER_SEND_INTERNAL_VOTES_ERROR';

export const userVoteInternal = (proposalId, yes) => ({
  type: USER_VOTE_INTERNAL,
  proposalId,
  yes,
});

export const userSendInternalVotes = (originId, internalVotes) => ({
  type: USER_SEND_INTERNAL_VOTES,
  successEvent: USER_INTERNAL_VOTES_SENT,
  errorEvent: USER_SEND_INTERNAL_VOTES_ERROR,
  apiCall: callSendUserVotes,
  originId,
  internalVotes,
});
