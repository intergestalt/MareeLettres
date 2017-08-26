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
  let limit = -1;
  if (store.getState().globals.proposalView === PROPOSAL_VIEWS.LIST) {
    limit = LOAD_CONFIG.DEFAULT_PROPOSAL_LIST_LIMIT;
  } else {
    limit = LOAD_CONFIG.DEFAULT_PROPOSAL_TINDER_LIMIT;
  }
  loadProposalsServiceProxy(false, id, limit, LOAD_CONFIG.LOAD_QUIET_TO_CHALLENGE_SELECTOR);
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
  result.lastLoaded = 1;
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

function mergeProposalListList(oldList, newList) {
  return newList;
}
function mergeProposalListTinder(oldList, newList) {
  const internalVotes = store.getState().user.internalVotes.internalVotes;
  const votes = store.getState().user.votes;

  // Create HASH from old List.
  const hash = {};
  for (let i = 0; i < oldList.length; i += 1) {
    const key = oldList[i]._id;
    hash[key] = { bool: true };
  }
  const result = oldList;
  // insert all new Elements after
  for (let i = 0; i < newList.length; i += 1) {
    const entry = newList[i];
    const key = entry._id;
    if (!hash[key]) {
      if (!internalVotes[key]) {
        if (!votes[key]) {
          result.push(entry);
        }
      }
    }
  }
  return result;
}

export function mergeProposalList(oldList, newList, proposalView) {
  if (proposalView === PROPOSAL_VIEWS.LIST) {
    return mergeProposalListList(oldList, newList);
  }
  return mergeProposalListTinder(oldList, newList);
}

export function cutProposalList(oldList, proposalView) {
  const myList = [];
  if (proposalView === PROPOSAL_VIEWS.LIST) {
    myList.length = LOAD_CONFIG.DEFAULT_PROPOSAL_LIST_LIMIT;
  } else {
    myList.length = LOAD_CONFIG.DEFAULT_PROPOSAL_TINDER_LIMIT;
  }

  return myList;
}
