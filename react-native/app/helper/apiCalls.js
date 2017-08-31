import config, { DYNAMIC_CONFIG } from '../config/config';
import { PROPOSAL_LIST_MODES, PROPOSAL_VIEWS } from '../consts';

function getPromiseGET(url) {
  console.log(url);
  const xhr = new XMLHttpRequest();
  return new Promise((resolve, reject) => {
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(xhr.responseText);
        } else {
          reject(xhr.responseText);
        }
      }
    };
    xhr.timeout = DYNAMIC_CONFIG.REQUEST_TIMEOUT;
    xhr.open('GET', url);
    xhr.send();
  });
}
function getPromisePOST(url, body) {
  console.log(url);
  const xhr = new XMLHttpRequest();
  return new Promise((resolve, reject) => {
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(xhr.responseText);
        } else {
          reject(xhr.responseText);
        }
      }
    };
    xhr.open('POST', url);
    xhr.timeout = DYNAMIC_CONFIG.REQUEST_TIMEOUT;
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(body);
  });
}

export const callLoadUser = (action) => {
  const url = `${config.API_PREFIX}players/${action.originId}`;
  console.log('API CALL: callLoadUser');
  return getPromiseGET(url);
};

export const callSendUserVotes = (action) => {
  const url = `${config.API_PREFIX}players/${action.originId}/votes`;
  console.log('API CALL: callSendUserVotes');
  const body = {};
  const votes = {};
  const proposalIds = Object.keys(action.internalVotes.internalVotes);

  for (let i = 0; i < proposalIds.length; i += 1) {
    const proposalId = proposalIds[i];
    votes[proposalId] = action.internalVotes.internalVotes[proposalId].bool;
  }
  body.votes = votes;
  return getPromisePOST(url, JSON.stringify(body));
};

export const callAllChallenges = () => {
  const url = `${config.API_PREFIX}challenges/`;
  console.log('API CALL: callAllChallenges');

  return getPromiseGET(url);
};

export const callOneChallenge = (action) => {
  const url = `${config.API_PREFIX}challenges/${action.challengeId}`;
  console.log('API CALL: callOneChallenge');

  return getPromiseGET(url);
};

export const callProposals = (action) => {
  let url = null;
  console.log(action);
  if (action.proposalView === PROPOSAL_VIEWS.TINDER) {
    url = `${config.API_PREFIX}tinder/${action.challengeId}/${action.originId}?limit=${action.limit}`;
  } else if (action.proposalListMode === PROPOSAL_LIST_MODES.MOST) {
    url = `${config.API_PREFIX}challenges/${action.challengeId}/proposals?limit=${action.limit}&sort=popular`;
  } else if (action.proposalListMode === PROPOSAL_LIST_MODES.NEWEST) {
    url = `${config.API_PREFIX}challenges/${action.challengeId}/proposals?limit=${action.limit}&sort=newest`;
  } else if (action.proposalListMode === PROPOSAL_LIST_MODES.TRENDING) {
    url = `${config.API_PREFIX}challenges/${action.challengeId}/proposals?limit=${action.limit}&sort=trending`;
  }
  console.log('API CALL: callProposals');
  // url = 'http://www.magazinredaktion.tk/timeout.php';

  return getPromiseGET(url);
};

export const callConfig = () => {
  const url = `${config.API_PREFIX}config/`;
  console.log('API CALL: callConfig');
  return getPromiseGET(url);
};

export const callAllContent = () => {
  const url = `${config.API_PREFIX}content/`;
  console.log('API CALL: callAllContent');
  return getPromiseGET(url);
};

export const callLetters = () => {
  const url = `${config.API_PREFIX}letters/`;
  console.log('API CALL: callLetters');
  return getPromiseGET(url);
};

export const callLettersInterval = () => {
  const url = `${config.API_PREFIX}letters?interval`;
  console.log('API CALL: callLettersInterval');
  console.log(url);
  return getPromiseGET(url);
};

export const callPostLetter = (action) => {
  const url = `${config.API_PREFIX}letters/`;
  const body = action.body;
  const req_body = {
    letters: [
      {
        character: body.character,
        origin_id: body.origin_id,
        coords: {
          lat: body.lat,
          lng: body.lng,
        },
        created_at: body.created_at,
      },
    ],
  };
  console.log('API CALL: callPostLetter');
  return getPromisePOST(url, JSON.stringify(req_body));
};

export const callPostProposal = (action) => {
  const url = `${config.API_PREFIX}proposals/`;
  const body = action.body;
  const req_body = {
    proposals: [
      {
        origin_id: body.origin_id,
        text: body.text,
        challenge_id: body.challenge_id,
        created_at: body.created_at,
      },
    ],
  };
  console.log('API CALL: callPostProposal');
  return getPromisePOST(url, JSON.stringify(req_body));
};

