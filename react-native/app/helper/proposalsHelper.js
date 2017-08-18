import { upDateSelectedChallengeIndex } from '../helper/challengesHelper';
import { loadProposalsServiceProxy } from '../helper/apiProxy';
import store from '../config/store';
import { PROPOSAL_VIEWS, PROPOSAL_LIST_MODES, CHALLENGE_VIEWS } from '../consts';
import { LOAD_CONFIG } from '../config/config';

function loadProposals(offset) {
  const challengeIndex = store.getState().challenges.selectedChallengeIndex;
  const index = challengeIndex + offset;
  const challenges = store.getState().challenges.challenges;
  if (index < 0 || index > challenges.length - 1) return;
  const id = challenges[index]._id;
  loadProposalsServiceProxy(
    false,
    id,
    LOAD_CONFIG.DEFAULT_PROPOSAL_LIMIT,
    LOAD_CONFIG.LOAD_QUIET_TO_CHALLENGE_SELECTOR,
  );
}

export function manageProposals() {
  // Assumption: Challengeslist is loaded
  console.log(`MANAGE Proposal ${store.getState().globals.challengeView}`);
  if (store.getState().globals.challengeView === CHALLENGE_VIEWS.DETAIL) {
    upDateSelectedChallengeIndex();
    loadProposals(-1);
    loadProposals(0);
    loadProposals(1);
  }
}
export function getProposalKey(proposalView, proposalListMode) {
  if (proposalView === PROPOSAL_VIEWS.LIST) {
    if (proposalListMode === PROPOSAL_LIST_MODES.MOST) {
      return 'listMost';
    } else if (proposalListMode === PROPOSAL_LIST_MODES.NEWEST) {
      return 'listNewest';
    } else if (proposalListMode === PROPOSAL_LIST_MODES.TRENDING) {
      return 'listTrending';
    }
  } else if (proposalView === PROPOSAL_VIEWS.TINDER) {
    return 'tinder';
  }
  return 'tinder';
}
export function getProposalList(proposalsParent, proposalView, proposalListMode) {
  if (proposalView === PROPOSAL_VIEWS.LIST) {
    if (proposalListMode === PROPOSAL_LIST_MODES.MOST) {
      return proposalsParent.listMost;
    } else if (proposalListMode === PROPOSAL_LIST_MODES.NEWEST) {
      return proposalsParent.listNewest;
    } else if (proposalListMode === PROPOSAL_LIST_MODES.TRENDING) {
      return proposalsParent.listTrending;
    }
  } else if (proposalView === PROPOSAL_VIEWS.TINDER) {
    return proposalsParent.tinder;
  }
  return proposalsParent.tinder;
}

export function addDefaultStructure(proposals) {
  const myProposals = proposals;
  if (!myProposals) {
    return {
      tinder: {
        proposals: [],
        isLoading: false,
        isPullDownLoading: false,
        isPullUpLoading: false,
        isError: false,
        time: 0,
      },
      listMost: {
        proposals: [],
        isLoading: false,
        isPullDownLoading: false,
        isPullUpLoading: false,
        isError: false,
        time: 0,
      },
      listNewest: {
        proposals: [],
        isLoading: false,
        isPullDownLoading: false,
        isPullUpLoading: false,
        isError: false,
        time: 0,
      },
      listTrending: {
        proposals: [],
        isLoading: false,
        isPullDownLoading: false,
        isPullUpLoading: false,
        isError: false,
        time: 0,
      },
    };
  }
  if (!myProposals.tinder) {
    myProposals.tinder = {
      proposals: [],
      isLoading: false,
      isError: false,
      isPullDownLoading: false,
      isPullUpLoading: false,
      time: 0,
    };
  }
  if (!myProposals.listMost) {
    myProposals.listMost = {
      proposals: [],
      isLoading: false,
      isError: false,
      time: 0,
    };
  }
  if (!proposals.listNewest) {
    myProposals.listNewest = {
      proposals: [],
      isLoading: false,
      isError: false,
      isPullDownLoading: false,
      isPullUpLoading: false,
      time: 0,
    };
  }
  if (!proposals.listTrending) {
    myProposals.listTrending = {
      proposals: [],
      isLoading: false,
      isPullDownLoading: false,
      isPullUpLoading: false,
      isError: false,
      time: 0,
    };
  }
  return myProposals;
}
