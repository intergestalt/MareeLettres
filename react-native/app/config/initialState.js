import { OriginId } from 'maree-lettres-shared';
import { PROPOSAL_LIST_MODES, CHALLENGE_VIEWS, PROPOSAL_VIEWS } from '../consts';

//import DeviceInfo from 'react-native-device-info';
//get ID -> DeviceInfo.getUniqueID()

// TODO get a uid from device
//      get coordinates from device

const sampleDate = 'Fri, 18 Aug 2017 09:22:55 GMT'; // (new Date()).toUTCString()

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
      latitude: 52.48,
      longitude: 13.41,
    },
    // coords of last map interaction
    map: {
      latitude: 52.48,
      longitude: 13.41,
    }
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
};
