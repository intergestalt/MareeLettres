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
        let newContent = {...state.content};
        //console.log(newContent);

        for (let i=0; i<action.result.letters.length; i+=1) {
          const letter = action.result.letters[i];

          // add letter if it hasn't been loaded
          if (!newContent[letter._id]) {
            const t = (new Date()).getTime() - (new Date(letter.created_at)).getTime();

            if (t < maxTime) {
              //console.log(maxTime/1000, t/1000)
              newContent[letter._id] = letter;
            }
          }
        }

        const currentRegion = store.getState().user.map.coordinates;
        const markerLimit = store.getState().user.map.maxMarkers; // hard limit on markers from server
        let counter = 0;
        let droppedMarkers = 0;
        
        // iterate over all letters and mark those that should be drawn on the map as markers
        Object.keys(newContent).forEach((key)=>{
          newContent[key].showAsMarker = false;
          const distance = getDistanceBetweenCoordinates(currentRegion.latitude, currentRegion.longitude, newContent[key].coords.lat, newContent[key].coords.lng);
          if(metresToDelta(distance, currentRegion.latitude) < currentRegion.latitudeDelta) { // letter is on screen
            if(counter < markerLimit) { // we can still show markers
              newContent[key].showAsMarker = true;
              counter++;  
            } else {
              droppedMarkers++;
            }
          }
        });

        console.log(counter + " / " + Object.keys(newContent).length + " (dropped: " + droppedMarkers + ")");
        
        const result = {
          ...state,
          blockWriting: droppedMarkers > 0,
          isLoading: false,
          isInternalLoading: false,
          content: newContent,
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
