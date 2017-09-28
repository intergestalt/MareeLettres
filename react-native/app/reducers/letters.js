import {
  LOAD_LETTERS,
  LOAD_LETTERS_INTERVAL,
  SUCCESS_LETTERS,
  SUCCESS_LETTERS_INTERVAL,
  NETWORK_ERROR_LOAD_LETTERS,
  NETWORK_ERROR_LOAD_LETTERS_INTERVAL,
  PUT_LETTER_ERROR,
  SET_LETTERS_IS_LOADING_FROM_STORAGE,
  SET_LETTERS,
} from '../actions/letters';
import { saveLettersToStorage } from '../helper/localStorage';

import store from '../config/store';
import initialState from '../config/initialState';

import { setUserMapWritePermissionProxy } from '../helper/userHelper';
import { getDistanceBetweenCoordinates, metresToDelta } from '../helper/mapHelper';

const letters = (state = initialState.letters, action) => {
  try {
    switch (action.type) {
      case LOAD_LETTERS: {
        console.log('Reducer: LOAD_LETTERS');
        return {
          ...state,
          isLoading: true,
          isInternalLoading: true,
        };
      }
      case LOAD_LETTERS_INTERVAL: {
        console.log('Reducer: LOAD_LETTERS_INTERVAL');
        return {
          ...state,
          isLoading: true,
          isInternalLoading: true,
        };
      }
      case SUCCESS_LETTERS_INTERVAL:
      case SUCCESS_LETTERS: {
        console.log('Reducer:', action.type);

        const maxTime = 1000 * store.getState().config.config.map_letter_decay_time;
        let letters = {...state.content};

        // these arrive sorted by created_at
        console.log("received " + action.result.letters.length + " letters");

        // replace new letters from server
        for (let i=0; i<action.result.letters.length; i+=1) {
          const letter = action.result.letters[i];
          const t = (new Date()).getTime() - (new Date(letter.created_at)).getTime();
          if (t > maxTime) {
            // remove letter if expired
            if(letters[letter._id]) {
              delete letters[letter._id];  
            }
          } else {
            // replace with new version if still active
            letters[letter._id] = letter;  
            letters[letter._id].age = t;
          }
        }

        const currentRegion = store.getState().user.map.coordinates;
        const markerLimit = store.getState().config.config.map_max_markers; // hard limit on markers from server
        console.log("map_max_markers: " + markerLimit);
        let counter = 0;
        let droppedMarkers = 0;

        let minLat = currentRegion.latitude - currentRegion.latitudeDelta; // get double screen size
        let maxLat = currentRegion.latitude + currentRegion.latitudeDelta;
        let minLng = currentRegion.longitude - currentRegion.longitudeDelta;
        let maxLng = currentRegion.longitude + currentRegion.longitudeDelta;

        let lettersOnScreen = {};
        let lettersOnScreenKeys = [];

        // iterate over all letters and mark those that should be drawn on the map as markers
        Object.keys(letters).forEach((key)=>{
          if(letters[key].coords.lat > minLat && letters[key].coords.lat < maxLat &&
            letters[key].coords.lng > minLng && letters[key].coords.lng < maxLng) { // letter is on screen
              lettersOnScreenKeys.push(key);
              lettersOnScreen[key] = letters[key];
          }
        });

        let lettersOnScreenSelection = {};
        if(lettersOnScreenKeys.length > markerLimit) {
          // sort letters on screen by age       
          lettersOnScreenKeys.sort((a,b)=> {return (letters[a].age > letters[b].age) ? 1 : ((letters[b].age > letters[a].age) ? -1 : 0);} ); 
          // cut off at limit
          lettersOnScreenKeys = lettersOnScreenKeys.slice(0, markerLimit);
          lettersOnScreenKeys.forEach((key)=>{
            lettersOnScreenSelection[key] = letters[key];
          })
          droppedMarkers = lettersOnScreenKeys.length - markerLimit;
        } else {
          lettersOnScreenSelection = lettersOnScreen;
        }
        
        console.log(Object.keys(lettersOnScreenSelection).length + " / " + Object.keys(letters).length + " (dropped: " + droppedMarkers + ")");
        
        const result = {
          ...state,
          blockWriting: droppedMarkers > 0,
          isLoading: false,
          isInternalLoading: false,
          content: lettersOnScreenSelection,
        };
        saveLettersToStorage(result);
        return result;
        //return state;
      }
      case NETWORK_ERROR_LOAD_LETTERS_INTERVAL:
      case NETWORK_ERROR_LOAD_LETTERS: {
        console.log('Reducer:', action.error);
        console.log(action.error);
        return {
          ...state,
          isLoading: false,
          isInternalLoading: false,
        };
      }
      case SET_LETTERS: {
        const myLetters = action.letters;
        return myLetters;
      }
      // Redux local storage
      case SET_LETTERS_IS_LOADING_FROM_STORAGE: {
        return { ...state, lettersIsLoadingFromStorage: action.yes };
      }
      default:
        return state;
    }
  } catch (e) {
    console.log('Reducer letters');
    console.log(e);
    throw e;
  }
};

export default letters;
