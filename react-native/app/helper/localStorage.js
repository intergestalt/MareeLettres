import { AsyncStorage } from 'react-native';
import store from '../config/store';
import {
  setUser,
  setUserIsLoadingFromStorage,
  setUserLoadedFromStorage,
  // setUserLoadedFromStorageResetDefaults,
} from '../actions/user';
import { setGlobals, setGlobalsIsLoadingFromStorage } from '../actions/general';
import { setContent, setContentIsLoadingFromStorage } from '../actions/content';
import { setConfig, setConfigIsLoadingFromStorage } from '../actions/config';
import { setChallenges, setChallengesIsLoadingFromStorage } from '../actions/challenges';
import { setProposals, setProposalsIsLoadingFromStorage } from '../actions/proposals';
import { setLetters, setLettersIsLoadingFromStorage } from '../actions/letters';
import { setMyLetters, setMyLettersIsLoadingFromStorage } from '../actions/map';
import { cutProposalList } from './proposalsHelper';
import {
  SCREENS,
  PROPOSAL_VIEWS,
  MAP_VIEWS,
  CHALLENGE_VIEWS,
  PROPOSAL_LIST_MODES,
} from '../consts';
import { setChallengesDateData } from '../actions/challengesTicker';

function existing(str) {
  if (!str) return false;
  if (str !== null && str !== '') {
    return true;
  }
  return false;
}

function normalClean(item) {
  const myItem = item;
  myItem.isInternalLoading = false;
  myItem.isLoading = false;
  return myItem;
}

function cleanUser(user) {
  let item = user;
  item.userIsLoadingFromStorage = false;
  item = normalClean(item);

  item.primary_letter = {
    ...item.primary_letter,
    disabled: false,
  };
  item.secondary_letter_1 = {
    ...item.secondary_letter_1,
    disabled: false,
  };
  item.secondary_letter_2 = {
    ...item.secondary_letter_2,
    disabled: false,
  };
  item.secondary_letter_3 = {
    ...item.secondary_letter_3,
    disabled: false,
  };
  item.secondary_letter_4 = {
    ...item.secondary_letter_4,
    disabled: false,
  };

  return item;
}

function cleanContent(content) {
  let item = content;
  item.contentIsLoadingFromStorage = false;
  item = normalClean(item);

  return item;
}

function cleanConfig(content) {
  let item = content;
  item.configIsLoadingFromStorage = false;
  item = normalClean(item);

  return item;
}

function cleanGlobals(globals) {
  let item = globals;
  item.globalsIsLoadingFromStorage = false;
  item = normalClean(item);
  item.isNetworkError = false;
  item.networkErrorMessageKey = null;
  item.screen = SCREENS.VOTE;
  item.mapView = MAP_VIEWS.OVERVIEW;
  item.showAllFinishedChallenges = false;
  item.lastNetworkError = 0;
  return item;
}

function cleanLetters(letters) {
  const item = letters;

  item.lettersIsLoadingFromStorage = false;
  item.isInternalLoading = false;
  item.isLoading = false;
  item.content = {};

  return item;
}

function cleanMyLetters(myLetters) {
  const item = myLetters;

  item.myLettersIsLoadingFromStorage = false;
  item.lettersIsLoadingFromStorage = false;
  item.isLoading = false;
  item.content = {};

  return item;
}

function cleanChallenges(challenges) {
  let item = challenges;
  item.challengesIsLoadingFromStorage = false;
  item = normalClean(item);
  item.selectedChallengeId = null;
  item.selectedChallengeIndex = -1;
  item.challengeView = CHALLENGE_VIEWS.LIST;

  const newChallenges = [];
  for (let i = 0; i < item.challenges.length; i += 1) {
    let challenge = item.challenges[i];
    if (!challenge.proposalView) {
      challenge.proposalView = PROPOSAL_VIEWS.TINDER;
    }
    if (!challenge.proposalListMode) {
      challenge.proposalListMode = PROPOSAL_LIST_MODES.MOST;
    }
    challenge = normalClean(challenge);
    newChallenges.push(challenge);
  }
  item.challenges = newChallenges;
  return item;
}

function proposalListClean(list) {
  let myList = list;
  myList = normalClean(myList);
  myList.isPullDownLoading = false;
  myList.isPullUpLoading = false;
  myList.lastLimit = 0;
  myList.lastLoaded = 1;
  return myList;
}
function cleanProposals(proposals) {
  const newProposals = proposals;
  if (newProposals.proposalsIsLoadingFromStorage) {
    delete newProposals.proposalsIsLoadingFromStorage;
  }
  const proposalIds = Object.keys(newProposals);
  for (let i = 0; i < proposalIds.length; i += 1) {
    const proposalId = proposalIds[i];
    const myProposals = newProposals[proposalId];
    const most = myProposals.listMost;
    const newest = myProposals.listNewest;
    const trending = myProposals.listTrending;
    const tinder = myProposals.tinder;
    myProposals.listMost = proposalListClean(most);
    myProposals.listNewest = proposalListClean(newest);
    myProposals.listTrending = proposalListClean(trending);
    myProposals.tinder = proposalListClean(tinder);
    newProposals[proposalId] = myProposals;
  }
  return newProposals;
}

function cutProposals(proposals) {
  const newProposals = proposals;
  const proposalIds = Object.keys(proposals);
  for (let i = 0; i < proposalIds.length; i += 1) {
    const proposalId = proposalIds[i];
    const myProposals = proposals[proposalId];
    if (myProposals.listMost && myProposals.listMost.proposals) {
      myProposals.listMost.proposals = cutProposalList(
        myProposals.listMost.proposals,
        PROPOSAL_VIEWS.LIST,
      );
    }
    if (myProposals.listNewest.proposals && myProposals.listNewest.proposals) {
      myProposals.listNewest.proposals = cutProposalList(
        myProposals.listNewest.proposals,
        PROPOSAL_VIEWS.LIST,
      );
    }
    if (myProposals.listTrending.proposals && myProposals.listTrending.proposals) {
      myProposals.listTrending.proposals = cutProposalList(
        myProposals.listTrending.proposals,
        PROPOSAL_VIEWS.LIST,
      );
    }
    if (myProposals.tinder.proposals && myProposals.tinder.proposals) {
      myProposals.tinder.proposals = cutProposalList(
        myProposals.tinder.proposals,
        PROPOSAL_VIEWS.TINDER,
      );
    }
    newProposals[proposalId] = myProposals;
  }
  return newProposals;
}

export async function saveUserToStorage(user) {
  try {
    let content = null;
    if (user) {
      content = user;
    } else {
      content = store.getState().user;
    }
    await AsyncStorage.setItem('user', JSON.stringify(content));
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function loadUserFromStorage() {
  try {
    store.dispatch(setUserIsLoadingFromStorage(true));
    const userStr = await AsyncStorage.getItem('user');

    if (existing(userStr)) {
      let user = JSON.parse(userStr);
      user = cleanUser(user);
      store.dispatch(setUser(user));
      store.dispatch(setUserIsLoadingFromStorage(false));
      store.dispatch(setUserLoadedFromStorage(true));
      // store.dispatch(setUserLoadedFromStorageResetDefaults());
      console.log('USER LOADED FROM STORAGE');
      return;
    }
    console.log('USER NOT EXISTING IN STORAGE');

    store.dispatch(setUserIsLoadingFromStorage(false));
    store.dispatch(setUserLoadedFromStorage(false));
  } catch (error) {
    store.dispatch(setUserIsLoadingFromStorage(false));
    store.dispatch(setUserLoadedFromStorage(false));
    console.log(error);
  }
}

export async function saveGlobalsToStorage(globals) {
  try {
    let content = null;
    if (globals) {
      content = globals;
    } else {
      content = store.getState().globals;
    }
    await AsyncStorage.setItem('globals', JSON.stringify(content));
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function loadGlobalsFromStorage() {
  try {
    store.dispatch(setGlobalsIsLoadingFromStorage(true));
    const globalsStr = await AsyncStorage.getItem('globals');

    if (existing(globalsStr)) {
      let globals = JSON.parse(globalsStr);
      globals = cleanGlobals(globals);
      store.dispatch(setGlobals(globals));
      console.log('GLOBALS LOADED FROM STORAGE');
    } else {
      console.log('GLOBALS NOT EXISTING IN STORAGE');
    }
    store.dispatch(setGlobalsIsLoadingFromStorage(false));
  } catch (error) {
    store.dispatch(setGlobalsIsLoadingFromStorage(false));
    console.log(error);
  }
}

export async function saveContentToStorage(content) {
  try {
    let myContent = null;
    if (content) {
      myContent = content;
    } else {
      myContent = store.getState().content;
    }
    await AsyncStorage.setItem('content', JSON.stringify(myContent));
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
export async function loadContentFromStorage() {
  try {
    store.dispatch(setContentIsLoadingFromStorage(true));
    const contentStr = await AsyncStorage.getItem('content');

    if (existing(contentStr)) {
      let content = JSON.parse(contentStr);
      content = cleanContent(content);
      store.dispatch(setContent(content));
      console.log('CONTENT LOADED FROM STORAGE');
    } else {
      console.log('CONTENT NOT EXISTING IN STORAGE');
    }
    store.dispatch(setContentIsLoadingFromStorage(false));
  } catch (error) {
    store.dispatch(setContentIsLoadingFromStorage(false));
    console.log(error);
  }
}
export async function saveConfigToStorage(config) {
  try {
    let myConfig = null;
    if (config) {
      myConfig = config;
    } else {
      myConfig = store.getState().config;
    }
    await AsyncStorage.setItem('config', JSON.stringify(myConfig));
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
export async function loadConfigFromStorage() {
  try {
    store.dispatch(setConfigIsLoadingFromStorage(true));
    const configStr = await AsyncStorage.getItem('config');

    if (existing(configStr)) {
      let config = JSON.parse(configStr);
      config = cleanConfig(config);
      store.dispatch(setConfig(config));
      console.log('CONFIG LOADED FROM STORAGE');
    } else {
      console.log('CONFIG NOT EXISTING IN STORAGE');
    }
    store.dispatch(setConfigIsLoadingFromStorage(false));
  } catch (error) {
    store.dispatch(setConfigIsLoadingFromStorage(false));
    console.log(error);
  }
}

export async function saveChallengesToStorage(challenges) {
  try {
    let content = null;
    if (challenges) {
      content = challenges;
    } else {
      content = store.getState().challenges;
    }
    await AsyncStorage.setItem('challenges', JSON.stringify(content));
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function loadChallengesFromStorage(props) {
  try {
    store.dispatch(setChallengesIsLoadingFromStorage(true));
    const challengesStr = await AsyncStorage.getItem('challenges');

    if (existing(challengesStr)) {
      let challenges = JSON.parse(challengesStr);
      challenges = cleanChallenges(challenges);
      store.dispatch(setChallenges(challenges, props));
      console.log('CHALLENGES LOADED FROM STORAGE');
    } else {
      console.log('CHALLENGES NOT EXISTING IN STORAGE');
    }
    store.dispatch(setChallengesDateData());
    store.dispatch(setChallengesIsLoadingFromStorage(false));
  } catch (error) {
    store.dispatch(setChallengesIsLoadingFromStorage(false));
    console.log(error);
  }
}
export async function saveProposalsToStorage(proposals) {
  try {
    let content = null;
    if (proposals) {
      content = proposals;
    } else {
      content = store.getState().proposals;
    }
    await AsyncStorage.setItem('proposals', JSON.stringify(content));
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function loadProposalsFromStorage() {
  try {
    store.dispatch(setProposalsIsLoadingFromStorage(true));
    const proposalsStr = await AsyncStorage.getItem('proposals');

    if (existing(proposalsStr)) {
      let proposals = JSON.parse(proposalsStr);
      proposals = cutProposals(proposals);
      proposals = cleanProposals(proposals);
      store.dispatch(setProposals(proposals));
      console.log('PROPOSALS LOADED FROM STORAGE');
    } else {
      console.log('PROPOSALS NOT EXISTING IN STORAGE');
    }
    store.dispatch(setProposalsIsLoadingFromStorage(false));
  } catch (error) {
    store.dispatch(setProposalsIsLoadingFromStorage(false));
    console.log(error);
  }
}
export async function saveLettersToStorage(letters) {
  try {
    let content = null;
    if (letters) {
      content = letters;
    } else {
      content = store.getState().letters;
    }
    await AsyncStorage.setItem('letters', JSON.stringify(content));
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function loadLettersFromStorage() {
  try {
    store.dispatch(setLettersIsLoadingFromStorage(true));
    const lettersStr = await AsyncStorage.getItem('letters');

    if (existing(lettersStr)) {
      let letters = JSON.parse(lettersStr);
      letters = cleanLetters(letters);
      console.log('LETTERS LOADED FROM STORAGE');
      store.dispatch(setLetters(letters));
    } else {
      console.log('LETTERS NOT EXISTING IN STORAGE');
    }
    store.dispatch(setLettersIsLoadingFromStorage(false));
  } catch (error) {
    store.dispatch(setLettersIsLoadingFromStorage(false));
    console.log(error);
  }
}
export async function saveMyLettersToStorage(myLetters) {
  try {
    let content = null;
    if (myLetters) {
      content = myLetters;
    } else {
      content = store.getState().myLetters;
    }
    await AsyncStorage.setItem('myLetters', JSON.stringify(content));
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
export async function loadMyLettersFromStorage() {
  try {
    store.dispatch(setMyLettersIsLoadingFromStorage(true));
    const myLettersStr = await AsyncStorage.getItem('myLetters');

    if (existing(myLettersStr)) {
      let myLetters = JSON.parse(myLettersStr);
      myLetters = cleanMyLetters(myLetters);
      store.dispatch(setMyLetters(myLetters));
      console.log('MYLETTERS LOADED FROM STORAGE');
    } else {
      console.log('MYLETTERS NOT EXISTING IN STORAGE');
    }
    store.dispatch(setMyLettersIsLoadingFromStorage(false));
  } catch (error) {
    store.dispatch(setMyLettersIsLoadingFromStorage(false));
    console.log(error);
  }
}

export async function deleteUserFromStorage() {
  await AsyncStorage.setItem('user', '');
}

export async function deleteAllFromStorage() {
  deleteUserFromStorage();
  await AsyncStorage.setItem('globals', '');
  await AsyncStorage.setItem('config', '');
  await AsyncStorage.setItem('content', '');
  await AsyncStorage.setItem('challenges', '');
  await AsyncStorage.setItem('proposals', '');
  await AsyncStorage.setItem('letters', '');
  await AsyncStorage.setItem('myLetters', '');
}
