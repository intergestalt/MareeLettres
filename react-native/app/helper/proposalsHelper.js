import { upDateSelectedChallengeIndex } from '../helper/challengesHelper';
import { loadProposalsServiceProxy } from '../helper/apiProxy';
import store from '../config/store';
import { CHALLENGE_VIEWS, DEFAULT_PROPOSAL_LIMIT } from '../consts';
import { PROPOSAL_VIEWS, PROPOSAL_LIST_MODES } from '../consts';

function loadProposals(offset) {
  const challengeIndex = store.getState().challenges.selectedChallengeIndex;
  const index = challengeIndex + offset;
  const challenges = store.getState().challenges.challenges;
  if (index < 0 || index > challenges.length - 1) return;
  const id = challenges[index]._id;
  loadProposalsServiceProxy(id, DEFAULT_PROPOSAL_LIMIT);
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
        isError: false,
        time: 0,
      },
      listMost: {
        proposals: [],
        isLoading: false,
        isError: false,
        time: 0,
      },
      listNewest: {
        proposals: [],
        isLoading: false,
        isError: false,
        time: 0,
      },
      listTrending: {
        proposals: [],
        isLoading: false,
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
      time: 0,
    };
  }
  if (!proposals.listTrending) {
    myProposals.listTrending = {
      proposals: [],
      isLoading: false,
      isError: false,
    };
  }
  return myProposals;
}
