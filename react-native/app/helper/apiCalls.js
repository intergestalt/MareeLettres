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

function locationUrlParams(c, action) {
  let url = '';
  const body = action.body;
  if (body) {
    if (body.centerLat && body.centerLng && body.radius) {
      url = `${c}centerLat=${body.centerLat}&centerLng=${body.centerLng}&radius=${body.radius}`;
    }
  }
  return url;
}

export const callLetters = (action) => {
  const url = `${config.API_PREFIX}letters/${locationUrlParams('?', action)}`;
  console.log('API CALL: callLetters');
  return getPromiseGET(url);
};

export const callLettersInterval = (action) => {
  const url = `${config.API_PREFIX}letters?interval=${action.body.interval}${locationUrlParams(
    '&',
    action,
  )}`;
  console.log('API CALL: callLettersInterval');
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
    proposal: {
      origin_id: body.origin_id,
      text: body.text,
      challenge_id: body.challenge_id,
      created_at: body.created_at,
    },
  };
  console.log(req_body);
  console.log('API CALL: callPostProposal');
  return getPromisePOST(url, JSON.stringify(req_body));
};
export const callLoadProposal = (action) => {
  const url = `${config.API_PREFIX}proposals/${action.proposalId}`;
  return getPromiseGET(url);
};
// TWITTER

function getTwitterPromisePOST(url, auth, body) {
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
    xhr.setRequestHeader('Authorization', auth);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
    xhr.send(body);
  });
}

function getTwitterPromiseGET(url, auth) {
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
    xhr.setRequestHeader('Authorization', auth);
    xhr.send();
  });
}

function getTwitterHTML(url) {
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
    xhr.setRequestHeader('Accept', 'text/html');
    xhr.send();
  });
}

export const callStreamGetAuthToken = () => {
  const url = `${DYNAMIC_CONFIG.TWITTER_API_ENDPOINT}oauth2/token`;
  const auth = `Basic ${DYNAMIC_CONFIG.TWITTER_AUTH_BASE64}`;
  const body = 'grant_type=client_credentials';

  return getTwitterPromisePOST(url, auth, body);
};

export const callStreamGetTweets = (action) => {
  const url = `${DYNAMIC_CONFIG.TWITTER_API_ENDPOINT}1.1/statuses/user_timeline.json?count=${DYNAMIC_CONFIG.TWITTER_TWEETS_PER_REQUEST}&screen_name=${DYNAMIC_CONFIG.TWITTER_HANDLE}`;
  const auth = `Bearer ${action.token}`;
  return getTwitterPromiseGET(url, auth);
};

export const callStreamGetTweetsHtml = (action) => {
  const url = `${DYNAMIC_CONFIG.TWITTER_URL}${DYNAMIC_CONFIG.TWITTER_HANDLE}`;
  return getTwitterHTML(url);
};
