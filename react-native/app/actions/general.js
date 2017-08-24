export const SWAP_LANGUAGE = 'SWAP_LANGUAGE';
export const SET_LANGUAGE = 'SET_LANGUAGE';
export const SET_PROPOSAL_VIEW = 'SET_PROPOSAL_VIEW';
export const SET_CHALLENGE_VIEW = 'SET_CHALLENGE_VIEW';
export const SET_PROPOSAL_LIST_MODE = 'SET_PROPOSAL_LIST_MODE';

export const swapLanguage = () => ({
  type: SWAP_LANGUAGE,
});
export const setLanguage = language => ({
  type: SET_LANGUAGE,
  language,
});

export const setProposalView = proposalView => ({
  type: SET_PROPOSAL_VIEW,
  proposalView,
});

export const setChallengeView = challengeView => ({
  type: SET_CHALLENGE_VIEW,
  challengeView,
});

export const setProposalListMode = proposalListMode => ({
  type: SET_PROPOSAL_LIST_MODE,
  proposalListMode,
});
