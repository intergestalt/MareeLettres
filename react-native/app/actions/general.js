export const SWAP_LANGUAGE = 'SWAP_LANGUAGE';
export const SET_TINDER_MODE = 'SET_TINDER_MODE';
export const SET_VOTE_VIEW = 'SET_VOTE_VIEW';

export const swapLanguage = () => ({
  type: SWAP_LANGUAGE,
});

export const setTinderMode = isTinder => ({
  type: SET_TINDER_MODE,
  isTinder,
});

export const setVoteView = voteView => ({
  type: SET_VOTE_VIEW,
  voteView,
});
