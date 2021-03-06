import { Dimensions } from 'react-native';

import {
  changeMapRegion,
  changeMapLayout,
  putLetterOnMap,
  loadMyLetters,
  setUserCoordinates,
  clearMyLetters
} from '../actions/map';

import store from '../config/store';

export function clearMyLettersProxy() {
  store.dispatch(clearMyLetters());
}

export function changeMapRegionProxy(region) {
  store.dispatch(changeMapRegion(region));
}

export function changeMapLayoutProxy(layout) {
  store.dispatch(changeMapLayout(layout));
}

export function putLetterOnMapProxy(character, x, y) {
  store.dispatch(putLetterOnMap(character, x, y));
}

export function loadMyLettersProxy() {
  store.dispatch(loadMyLetters());
}

export function setUserCoordinatesProxy(lat, lng) {
  store.dispatch(setUserCoordinates(lat, lng));
}

export function getDistanceBetweenCoordinates(lat0, lng0, lat1, lng1) {
    // get ~ distance between coordinates on a smooth sphere
    const dLat = Math.abs(lat1 - lat0) * 111319.9;
    const dLng = Math.abs(lng1 - lng0) * (111319.9 * Math.cos(lat1 * Math.PI / 180.));
    const distance = Math.sqrt(Math.pow(dLat, 2) + Math.pow(dLng, 2));

    return distance;
}

export function metresToDelta(m, mapLat) {
    // convert metres to ~ map delta (degrees)
    const delta = m / (111320 * Math.cos(mapLat * Math.PI / 180));

    return delta;
}

export function latLngToScreen(lat, lng, region, width, height) {
  let normalised = latLngToXY(lat, lng, region);
  return xyToNativeScreen(normalised.x, normalised.y, width, height);
}

export function latLngToXY(lat, lng, region) {
    // convert world coordinates to screen space
    // if coordinate is on screen, the return range will be [-0.5, 0.5]
    let x = (lng - region.longitude) / region.longitudeDelta;
    let y = (region.latitude - lat) / region.latitudeDelta

    return {x: x, y: y};
  }

export function xyToNativeScreen(x, y, width, height) {
    // convert normalised screen space to native screen space
    const nativeX = (x + 0.5) * width;
    const nativeY = (y + 0.5) * height;
  
    return {x: nativeX, y: nativeY}
}

export function scaleLetterSize(base_size, map_delta) {
  let max_letter_size = parseFloat((base_size / (1200 * map_delta)).toFixed(1));
  return max_letter_size;
}
