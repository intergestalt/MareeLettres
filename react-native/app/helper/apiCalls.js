import config, { LOAD_CONFIG } from '../config/config';
import { PROPOSAL_LIST_MODES, PROPOSAL_VIEWS } from '../consts';

function getPromiseGET(url) {
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
    xhr.timeout = LOAD_CONFIG.REQUEST_TIMEOUT;
    xhr.open('GET', url);
    xhr.send();
  });
}
function getPromisePOST(url, body) {
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
    xhr.timeout = LOAD_CONFIG.REQUEST_TIMEOUT;
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(body);
  });
}

export const callLoadUser = (action) => {
  const url = `${config.API_PREFIX}players/${action.originId}`;
  console.log('API CALL: callLoadUser');
  console.log(url);
  // WAS: return fetch(url);
  return getPromiseGET(url);
};

export const callSendUserVotes = (action) => {
  const url = `${config.API_PREFIX}players/${action.originId}/votes`;
  console.log('API CALL: callSendUserVotes');
  console.log(url);
  const body = {};
  const votes = {};
  const proposalIds = Object.keys(action.internalVotes.internalVotes);

  for (let i = 0; i < proposalIds.length; i += 1) {
    const proposalId = proposalIds[i];
    votes[proposalId] = action.internalVotes.internalVotes[proposalId].bool;
  }
  body.votes = votes;
  return getPromisePOST(url, JSON.stringify(body));
  /*  WAS: return fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(body),
  }); */
};

export const callAllChallenges = () => {
  const url = `${config.API_PREFIX}challenges/`;
  console.log('API CALL: callAllChallenges');
  console.log(url);
  return getPromiseGET(url);
};

export const callOneChallenge = (action) => {
  const url = `${config.API_PREFIX}challenges/${action.challengeId}`;
  console.log('API CALL: callOneChallenge');
  console.log(url);
  return getPromiseGET(url);
};

export const callProposals = (action) => {
  let url = null;
  if (action.proposalView === PROPOSAL_VIEWS.TINDER) {
    url = `${config.API_PREFIX}tinder/${action.challengeId}/${action.originId}?limit=${action.limit}`;
  } else if (action.proposalListMode === PROPOSAL_LIST_MODES.MOST) {
    url = `${config.API_PREFIX}challenges/${action.challengeId}/proposals?limit=${action.limit}&sort=popular`;
    // url = 'http://www.magazinredaktion.tk/timeout.php';
  } else if (action.proposalListMode === PROPOSAL_LIST_MODES.NEWEST) {
    url = `${config.API_PREFIX}challenges/${action.challengeId}/proposals?limit=${action.limit}&sort=newest`;
  } else if (action.proposalListMode === PROPOSAL_LIST_MODES.TRENDING) {
    url = `${config.API_PREFIX}challenges/${action.challengeId}/proposals?limit=${action.limit}&sort=trending`;
  }
  console.log('API CALL: callProposals');
  console.log(url);
  return getPromiseGET(url);
};

export const callConfig = () => {
  const url = `${config.API_PREFIX}config/`;
  console.log('API CALL: callConfig');
  console.log(url);
  return getPromiseGET(url);
};

export const callAllContent = () => {
  const url = `${config.API_PREFIX}content/`;
  console.log('API CALL: callAllContent');
  console.log(url);
  return getPromiseGET(url);
};

export const callLetters = () => {
  const url = `${config.API_PREFIX}letters/`;
  console.log('API CALL: callLetters');
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
  console.log(url);
  return getPromisePOST(url, JSON.stringify(req_body));
};
