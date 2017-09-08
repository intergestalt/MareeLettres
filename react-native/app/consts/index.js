// indicating if we are in the List of Challenges or in detail view
const SCREENS = {
  VOTE: 'vote',
  MAP: 'map',
  INFO: 'info',
  NEWS: 'news',
};

const CHALLENGE_VIEWS = {
  DETAIL: 'detail',
  LIST: 'list',
  SUGGEST: 'suggest',
};
const MAP_VIEWS = {
  OVERVIEW: 'overview',
  CAMERA: 'camera',
  LETTER_SELECTOR: 'letter_selector',
  QR_CODE_GET: 'qr_code_get',
  QR_CODE_SEND: 'qr_code_send',
};
const PROPOSAL_VIEWS = {
  TINDER: 'tinder',
  LIST: 'list',
};

const PROPOSAL_LIST_MODES = {
  MOST: 'most',
  NEWEST: 'newest',
  TRENDING: 'trending',
};

export { MAP_VIEWS, CHALLENGE_VIEWS, PROPOSAL_LIST_MODES, PROPOSAL_VIEWS, SCREENS };
