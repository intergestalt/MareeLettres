import {
  USER_VOTE_INTERNAL,
  USER_SEND_INTERNAL_VOTES,
  USER_INTERNAL_VOTES_SENT,
  USER_SEND_INTERNAL_VOTES_ERROR,
} from '../actions/userVotes';

import initialState from '../config/initialState';

export default (state = initialState.user, action) => {
  switch (action.type) {
    case USER_VOTE_INTERNAL: {
      const myInternalVotes = state.internalVotes.internalVotes;
      myInternalVotes[action.proposalId] = action.yes;
      const result = {
        ...state,
        internalVotes: {
          ...state.internalVotes,
          internalVotes: myInternalVotes,
        },
      };
      return result;
    }
    case USER_SEND_INTERNAL_VOTES: {
      const myInternalVotes = state.internalVotes;
      myInternalVotes.isInternalLoading = true;
      const result = {
        ...state,
        internalVotes: myInternalVotes,
      };
      return result;
    }
    case USER_INTERNAL_VOTES_SENT: {
      const myInternalVotes = state.internalVotes;
      myInternalVotes.isInternalLoading = false;
      const result = {
        ...state,
        myInternalVotes,
      };
      return result;
    }
    case USER_SEND_INTERNAL_VOTES_ERROR: {
      const myInternalVotes = state.internalVotes;
      myInternalVotes.isInternalLoading = false;
      const result = {
        ...state,
        myInternalVotes,
      };
      return result;
    }
    default:
      return state;
  }
};
