import { DYNAMIC_CONFIG } from '../config/config';
import { screenHeight } from '../helper/screen';

export function listIsEmpty(list) {
  if (!list) return true;
  if (list.length === 0) return true;
  return false;
}
export function objectIsEmpty(object) {
  if (!object) return true;
  if (Object.keys(object).length === 0) return true;
  return false;
}
export function isEmpty(item) {
  if (!item) return true;
  if (item === '') return true;
  return false;
}
export function isEmptyContent(about, language) {
  if (!about) return true;
  if (language === 'fr') {
    if (isEmpty(about.fr)) {
      return true;
    }
  } else if (isEmpty(about.en)) {
    return true;
  }
  return false;
}

export function getZuffiDelayForApi() {
  let res = Math.random() * DYNAMIC_CONFIG.DELAY_CONFIG_CALL;
  res = Math.round(res);
  if (res < 0) res = 0;
  if (res > DYNAMIC_CONFIG.DELAY_CONFIG_CALL) {
    res = DYNAMIC_CONFIG.DELAY_CONFIG_CALL;
  }
  return res;
}

export function getDuration(x1, y1, x2 = 0, y2 = 0) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const a = dx * dx;
  const b = dy * dy;
  const dist = Math.round(Math.sqrt(a + b));
  const f = dist / screenHeight;
  const duration = Math.round(f * 1000);
  return duration;
}
