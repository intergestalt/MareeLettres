import { upDateSelectedChallengeIndex } from '../helper/challengesHelper';
import { loadProposalsServiceProxy } from '../helper/apiProxy';
import store from '../config/store';
import { VOTE_VIEWS } from '../consts';

function loadProposals(offset) {
  const challengeIndex = store.getState().challenges.selectedChallengeIndex;
  const index = challengeIndex + offset;
  const challenges = store.getState().challenges.challenges;
  if (index < 0 || index > challenges.length - 1) return;
  const id = challenges[index]._id;
  loadProposalsServiceProxy(id);
}

export function manageProposals() {
  // Assumption: Challengeslist is loaded
  console.log(`MANAGE Proposal ${store.getState().globals.voteView}`);
  if (store.getState().globals.voteView === VOTE_VIEWS.DETAIL) {
    upDateSelectedChallengeIndex();
    loadProposals(-1);
    loadProposals(0);
    loadProposals(1);
  }
}
