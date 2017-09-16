import { loadProposalsServiceProxy } from '../helper/apiProxy';
import store from '../config/store';
import { PROPOSAL_VIEWS, PROPOSAL_LIST_MODES, CHALLENGE_VIEWS } from '../consts';
import { DYNAMIC_CONFIG } from '../config/config';
import { listIsEmpty } from './helper';

function loadProposals(offset) {
  const challengeIndex = store.getState().challenges.selectedChallengeIndex;
  const index = challengeIndex + offset;
  const challenges = store.getState().challenges.challenges;
  if (index < 0 || index > challenges.length - 1) return;
  const challenge = challenges[index];
  const id = challenge._id;
  let limit = -1;
  if (challenge.proposalView === PROPOSAL_VIEWS.LIST) {
    limit = DYNAMIC_CONFIG.DEFAULT_PROPOSAL_LIST_LIMIT;
  } else {
    limit = DYNAMIC_CONFIG.DEFAULT_PROPOSAL_TINDER_LIMIT;
  }

  loadProposalsServiceProxy(false, id, limit, DYNAMIC_CONFIG.LOAD_QUIET_TO_CHALLENGE_SELECTOR.bool);
}

export function manageProposals() {
  // Assumption: Challengeslist is loaded
  if (store.getState().challenges.challengeView === CHALLENGE_VIEWS.DETAIL) {
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
  if (!proposalsParent) return null;
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
  // just ignore the old list, but delete the user vote
  const votes = store.getState().user.votes;

  const result = [];
  // insert all new Elements after adding user votes
  let inReview = 0;
  let blocked = 0;
  for (let i = 0; i < newList.length; i += 1) {
    const entry = newList[i];
    if (!entry.blocked) {
      if (!entry.in_review) {
        console.log(entry);
        const key = entry._id;

        if (votes[key]) {
          if (votes[key].bool) {
            entry.yes_votes -= 1;
          } else {
            entry.no_votes -= 1;
          }
        }

        result.push(entry);
      } else {
        inReview += 1;
      }
    } else {
      blocked += 1;
    }
  }
  console.log(`blocked vote ${blocked}`);
  console.log(`vote in review ${inReview}`);
  return result;
}
function mergeProposalListTinder(oldList, newList) {
  const internalVotes = store.getState().user.internalVotes.internalVotes;
  const votes = store.getState().user.votes;

  // Create HASH from old List.
  const hash = {};
  if (!listIsEmpty(oldList)) {
    for (let i = 0; i < oldList.length; i += 1) {
      const key = oldList[i]._id;
      hash[key] = { bool: true };
    }
  }

  const result = oldList;
  // insert all new Elements after
  const count = newList.length;
  let countVote = 0;
  let countInternal = 0;
  let countAlready = 0;
  let inReview = 0;
  let blocked = 0;
  for (let i = 0; i < newList.length; i += 1) {
    const entry = newList[i];
    const key = entry._id;
    if (!entry.blocked) {
      if (!entry.in_review) {
        if (!hash[key]) {
          if (!internalVotes[key]) {
            if (!votes[key]) {
              result.push(entry);
            } else {
              countVote += 1;
            }
          } else {
            countInternal += 1;
          }
        } else {
          countAlready += 1;
        }
      } else {
        inReview += 1;
      }
    } else {
      blocked += 1;
    }
  }
  console.log(`blocked vote ${blocked}`);
  console.log(`vote in review ${inReview}`);
  console.log(`Already voted ${countVote}`);
  console.log(`New Proposals ${count}`);
  console.log(`Already in list ${countAlready}`);
  console.log(`Already internal voted ${countInternal}`);
  console.log(`Already voted ${countVote}`);
  return result;
}

export function mergeProposalList(oldList, newList, proposalView) {
  if (proposalView === PROPOSAL_VIEWS.LIST) {
    return mergeProposalListList(oldList, newList);
  }
  return mergeProposalListTinder(oldList, newList);
}

export function cutProposalList(oldList, proposalView) {
  if (listIsEmpty(oldList)) {
    return oldList;
  }

  const myList = oldList;
  if (proposalView === PROPOSAL_VIEWS.LIST) {
    myList.length = Math.min(oldList.length, DYNAMIC_CONFIG.DEFAULT_PROPOSAL_LIST_LIMIT);
  } else {
    myList.length = Math.min(oldList.length, DYNAMIC_CONFIG.DEFAULT_PROPOSAL_TINDER_LIMIT);
  }

  return myList;
}

export function getProposalVotesWithUser(id) {
  const votes = store.getState().user.votes;
  const internalVotes = store.getState().user.internalVotes.internalVotes;
  const vote = votes[id];
  const internalVote = internalVotes[id];
  let votesYesOffset = 0;
  let votesNoOffset = 0;
  let yes = false;
  let no = false;
  // Set the offset also in case of votes already sent.
  // User-Votes are deleted internaly after every load
  if (vote) {
    if (vote.bool) {
      yes = true;
      no = false;
      votesYesOffset = 1;
      votesNoOffset = 0;
    } else {
      yes = false;
      no = true;
      votesNoOffset = 1;
      votesYesOffset = 0;
    }
  }
  if (internalVote) {
    if (internalVote.bool) {
      yes = true;
      no = false;
      votesYesOffset = 1;
      votesNoOffset = 0;
    } else {
      votesNoOffset = 1;
      votesYesOffset = 0;
      yes = false;
      no = true;
    }
  }
  const res = { yes, no, votesYesOffset, votesNoOffset };
  return res;
}
