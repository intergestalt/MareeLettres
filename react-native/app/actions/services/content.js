import { callAllContent } from '../../helper/apiCalls';

export const LOAD_CONTENT = 'LOAD_CONTENT';
export const CONTENT_LOADED = 'CONTENT_LOADED';
export const NETWORK_ERROR_LOAD_CONTENT = 'NETWORK_ERROR_LOAD_CONTENT';

export const loadContent = () => ({
  type: LOAD_CONTENT,
  successEvent: CONTENT_LOADED,
  errorEvent: NETWORK_ERROR_LOAD_CONTENT,
  apiCall: callAllContent,
});
