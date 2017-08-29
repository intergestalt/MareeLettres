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
export function isEmptyContent(howto, about, language) {
  if (!howto) return true;
  if (!about) return true;
  if (language === 'fr') {
    if (isEmpty(howto.fr)) {
      return true;
    }
    if (isEmpty(about.fr)) {
      return true;
    }
  } else {
    if (isEmpty(howto.en)) {
      return true;
    }
    if (isEmpty(about.en)) {
      return true;
    }
  }
  return false;
}
