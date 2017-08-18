import { OriginId } from 'maree-lettres-shared';
import { PROPOSAL_LIST_MODES, CHALLENGE_VIEWS, PROPOSAL_VIEWS } from '../consts';

const sampleDate = (new Date()).toUTCString();
const lat = 52.4975;
const lng = 13.4377;

export default {
  user: {
    // NOTE: Return string is very long. Results in complex (ugly) QR Codes.
    //       Rework generateFromDeviceId? A set-length hash function might work
    //       -xavier
    origin_id: OriginId.generateFromDeviceId(Expo.Constants.deviceId),
    primary_letter: {
      character: 'X',
      acquired_at: sampleDate,
      last_used_at: sampleDate,
    },
    secondary_letters: [{
        character: 'A',
        acquired_at: sampleDate,
        last_used_at: sampleDate,
      },{
        character: 'B',
        acquired_at: sampleDate,
        last_used_at: sampleDate,
      },{
        character: 'C',
        acquired_at: sampleDate,
        last_used_at: sampleDate,
      },{
        character: 'D',
        acquired_at: sampleDate,
        last_used_at: sampleDate, 
      },
    ],
    votes: [{
      proposal_id: 'my_proposal',
      bool: true,
    }],
    created_at: sampleDate,
    last_seen: sampleDate,
    banned: false,
    coordinates: {
      latitude: lat,
      longitude: lng,
    },
    // user interaction with map
    map: {
      // items selected in Map menu
      lettersSelected: {
        mine: false,
        friends: [false, false, false, false],
      },
      // coords of last map interaction
      coords: {
        lat: lat,
        lng: lng,
      },
    },
  },

  globals: {
    language: 'fr',
    proposalView: PROPOSAL_VIEWS.LIST,
    proposalListMode: PROPOSAL_LIST_MODES.MOST,
    challengeView: CHALLENGE_VIEWS.LIST,
  },

  challenges: {
    selectedChallengeId: null,
    selectedChallengeIndex: -1,
    isLoading: true,
    isError: false,
    time: null,
    challenges: [],
  },
  challengesTicker: {},
  proposals: {},

  content: {
    isLoading: false,
    isLoaded: false,
    isError: false,
    time: null,
    content: [],
  },

  letters: {
    isLoading: false,
    isError: false,
    content: [],
  },

  // letter response structure
  // {
  //     "_id": "neNZkj5QJhRvXJkJu",
  //     "character": "M",
  //     "coords": {
  //         "lat": 52.47541975964792,
  //         "lng": 13.453484357399867
  //     }
  // }
};
