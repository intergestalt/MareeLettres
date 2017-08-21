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

function getDefaultEntry() {
  const result = {};
  result.proposals = [];
  result.isLoading = false;
  result.isInternalLoading = false;
  result.isError = false;
  result.isPullDownLoading = false;
  result.isPullUpLoading = false;
  result.lastLimit = 0;
  result.time = 0;
  return result;
}
export function addDefaultStructure(proposals) {
  const myProposals = proposals;
  if (!myProposals) {
    return {
      tinder: getDefaultEntry(),
      listMost: getDefaultEntry(),
      listNewest: getDefaultEntry(),
      listTrending: getDefaultEntry(),
    };
  }

  if (!myProposals.tinder) {
    myProposals.tinder = getDefaultEntry();
  }
  if (!myProposals.listMost) {
    myProposals.listMost = getDefaultEntry();
  }
  if (!proposals.listNewest) {
    myProposals.listNewest = getDefaultEntry();
  }
  if (!proposals.listTrending) {
    myProposals.listTrending = getDefaultEntry();
  }
  return myProposals;
}
