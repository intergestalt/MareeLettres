(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("cryptr"));
	else if(typeof define === 'function' && define.amd)
		define("maree-lettres-shared", ["cryptr"], factory);
	else if(typeof exports === 'object')
		exports["maree-lettres-shared"] = factory(require("cryptr"));
	else
		root["maree-lettres-shared"] = factory(root["cryptr"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_3__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var config = {
  user_key_phone_code: 'oAmQRC', // random key to mark a string as a valid origin id from phone
  user_key_other_code: 'zsl25y', // random key to mark a string as a valid origin id from string
  user_key_code_length: 6, // length of the codes above
  user_key_secret: 'kYB1rIzSjbEhKEMAFCvx', // random key used for encryption between server and client
  available_characters_proposals: 'AAABCDEEEEFGHIIJKLLMNNOOPPQQRRSSSTTUUVWXYZ?*:', // all the physical letters
  available_letters_primary: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', // letter vailable for personal choice
  available_letters_map: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', // letters allowed on map
  qr_code_prefix: 'http://lettres.paris/'
};

exports.default = config;
module.exports = exports['default'];

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.systemConfigInitial = exports.systemConfigDefaults = exports.QrCode = exports.AvailableLetters = exports.OriginId = undefined;

var _origin_id = __webpack_require__(2);

var _letters = __webpack_require__(4);

var _qrCode = __webpack_require__(5);

var _systemConfig = __webpack_require__(6);

exports.OriginId = _origin_id.OriginId;
exports.AvailableLetters = _letters.AvailableLetters;
exports.QrCode = _qrCode.QrCode;
exports.systemConfigDefaults = _systemConfig.systemConfigDefaults;
exports.systemConfigInitial = _systemConfig.systemConfigInitial;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DeviceIdException = exports.OriginId = undefined;

var _cryptr = __webpack_require__(3);

var _cryptr2 = _interopRequireDefault(_cryptr);

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
* usage:
* import shared from 'maree-lettres-shared';
* console.log(shared.userKeys.getBrowserUserKey());
*/
var encryptor = new _cryptr2.default(_config2.default.user_key_secret);
var min_length = 8;

function DeviceIdException(s) {
  this.message = 'Invalid DeviceId "' + s + '" \u2013 minimum ' + min_length + ' characters required.';
  this.name = 'DeviceIdException';
}

var OriginId = {
  // user functions

  generateFromString: function generateFromString(s) {
    var code = s + '-' + _config2.default.user_key_other_code;
    var encrypted = encryptor.encrypt(code);

    return encrypted;
  },
  generateFromDeviceId: function generateFromDeviceId(s) {
    if (typeof s !== 'string' || s === '' || s.length < min_length) {
      throw new DeviceIdException(s);
    }

    var code = s + '-' + _config2.default.user_key_phone_code;
    var encrypted = encryptor.encrypt(code);

    return encrypted;
  },
  verify: function verify(origin_id) {
    var dec = '';

    try {
      dec = this.decryptRaw(origin_id);
    } catch (err) {
      return false;
    }

    var code = this.splitParts(dec).code;

    return code === _config2.default.user_key_phone_code || code === _config2.default.user_key_other_code;
  },
  getOrigin: function getOrigin(origin_id) {
    var dec = this.decryptRaw(origin_id);
    var origin = this.splitParts(dec).origin;

    return origin;
  },
  getOriginType: function getOriginType(origin_id) {
    var dec = this.decryptRaw(origin_id);
    var code = this.splitParts(dec).code;

    if (code === _config2.default.user_key_phone_code) {
      return 'phone';
    } else if (code === _config2.default.user_key_other_code) {
      return 'other';
    }
    return 'unknown';
  },


  // private

  decryptRaw: function decryptRaw(origin_id) {
    var decrypted = encryptor.decrypt(origin_id);

    return decrypted;
  },
  splitParts: function splitParts(decrypted) {
    return {
      code: decrypted.substr(-1 * _config2.default.user_key_code_length),
      origin: decrypted.substr(0, decrypted.length - _config2.default.user_key_code_length - 1)
    };
  }
};

exports.OriginId = OriginId;
exports.DeviceIdException = DeviceIdException;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AvailableLetters = undefined;

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AvailableLetters = {};

AvailableLetters.proposal = _config2.default.available_characters_proposals;
AvailableLetters.primary = _config2.default.available_letters_primary;
AvailableLetters.map = _config2.default.available_letters_map;

exports.AvailableLetters = AvailableLetters;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.QrCode = undefined;

var _config = __webpack_require__(0);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var QrCode = {
    prefix: _config2.default.qr_code_prefix
};

exports.QrCode = QrCode;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _systemConfigDefaults = __webpack_require__(7);

var _systemConfigDefaults2 = _interopRequireDefault(_systemConfigDefaults);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MakeValuesObject = function MakeValuesObject(defaults) {
    var obj = {};

    Object.keys(defaults).forEach(function (key) {
        if (typeof defaults[key] === 'function') return;
        obj[key] = defaults[key].defaultValue;
    });
    return obj;
};

var systemConfigInitial = MakeValuesObject(_systemConfigDefaults2.default);

exports.default = { systemConfigDefaults: _systemConfigDefaults2.default, systemConfigInitial: systemConfigInitial };
module.exports = exports['default'];

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var systemConfigDefaults = {
    proposals_auto_accept: {
        defaultValue: false,
        title: 'Auto-Accept new proposals, bypass review process'
    },
    proposal_boost_amount: {
        defaultValue: 5,
        title: 'The boost in number of positive votes a proposal gets when a proposal with the same text is submitted'
    },
    track_player_movements: {
        defaultValue: true,
        title: 'Constantly update player positions on map'
    },
    tinder_proposals_regeneration_interval: {
        defaultValue: 300,
        title: 'Interval at which TinderProposals get regenerated on Server (seconds)'
    },
    trending_regeneration_interval: {
        defaultValue: 60,
        title: 'Interval at which Trends get calculated on Server (seconds)'
    },
    trend_damping_halflife_time: {
        defaultValue: 120,
        title: 'Damping of trend changes: time in seconds after which half of the impact of a change will be gone'
    },
    map_update_interval: {
        defaultValue: 10,
        title: 'Map: Update interval when map screen is open'
    },
    map_update_latency: {
        defaultValue: 2,
        title: 'Map Server: Extra time to compensate network latency'
    },
    map_cache_update_interval: {
        defaultValue: 10,
        title: 'Map Server: How often te refresh the map letters cache (<= map_update_interval)'
    },
    map_query_update_latency: {
        defaultValue: 1,
        title: 'Map Server: How long it takes to query the database'
    },
    map_letter_decay_time: {
        defaultValue: 5000,
        title: 'Map: Letter Decay Time (seconds)'
    },
    map_letter_regeneration_time_primary: {
        defaultValue: 5,
        title: 'Map: Regeneration time of Primary Letter (seconds)'
    },
    map_letter_regeneration_time_secondary: {
        defaultValue: 5,
        title: 'Map: Regeneration time of Secondary Letters (seconds)'
    },
    map_letter_transfer_timeout: {
        defaultValue: 60,
        title: 'Map: For how long a letter share QR code is valid'
    },
    map_drop_zone_radius: {
        defaultValue: 75,
        title: 'Map: Radius of the drop zone in meters'
    },
    map_min_zoom_level: {
        defaultValue: 0,
        title: 'Map: Minimum Zoom Level (NOTE: this is not used to set initial zoom, use map_delta_initial)'
    },
    map_max_zoom_level: {
        defaultValue: 20,
        title: 'Map: Maximum Zoom Level'
    },
    map_letter_base_size: {
        defaultValue: 10,
        title: 'Map: Letter size in meters'
    },
    map_delta_initial: {
        defaultValue: 2.5,
        title: 'Map: map zoom relative to dropzone size, 1 = drop zone is fullscreen'
    },
    map_delta_max: {
        defaultValue: 9,
        title: 'Map: maximum map zoom relative to drop zone size'
    },
    map_max_markers: {
        defaultValue: 50,
        title: 'Map: maximum number of letters to render as markers on map'
    },
    map_primary_letter_reset: {
        defaultValue: 1440,
        title: 'Map: time after which primary letter can be reset (in minutes)'
    },
    stream_twitter_handle: {
        defaultValue: 'http://sebquack.perseus.uberspace.de/maree/TwitterWebView.html',
        title: 'Stream: The twitter handle'
    },
    challenge_list_image_url: {
        defaultValue: 'http://sebquack.perseus.uberspace.de/maree/title.jpg',
        title: 'Image for topic list'
    }
};

exports.default = systemConfigDefaults;
module.exports = exports['default'];

/***/ })
/******/ ]);
});
//# sourceMappingURL=maree-lettres-shared.js.map