/*
* usage:
* import shared from 'maree-lettres-shared';
* console.log(shared.userKeys.getBrowserUserKey());
*/
import Cryptr from 'cryptr';

import config from './config.js';

const encryptor = new Cryptr(config.user_key_secret);

const OriginId = {
  // user functions

  generateFromString(s) {
    const code = s + '-' + config.user_key_other_code;
    const encrypted = encryptor.encrypt(code);

    return encrypted;
  },

  verify(origin_id) {
    const dec = this.decryptRaw(origin_id);
    const code = this.splitParts(dec).code;

    return code === config.user_key_phone_code || code === config.user_key_other_code;
  },

  getOrigin(origin_id) {
    const dec = this.decryptRaw(origin_id);
    const origin = this.splitParts(dec).origin;

    console.log(origin);

    return origin;
  },

  getOriginType(origin_id) {
    const dec = this.decryptRaw(origin_id);
    const code = this.splitParts(dec).code;

    if (code === config.user_key_phone_code) {
      return 'phone';
    } else if (code === config.user_key_other_code) {
      return 'other';
    }
    return 'unknown';
  },

  // private

  decryptRaw(origin_id) {
    const decrypted = encryptor.decrypt(origin_id);

    return decrypted;
  },

  splitParts(decrypted) {
    return {
      code: decrypted.substr(-1 * config.user_key_code_length),
      origin: decrypted.substr(0, decrypted.length - config.user_key_code_length - 1)
    };
  }
};

/*
const userKeys = {
  getBrowserUserKey: function () {
    const string = config.user_key_browser_code;

    return string;
  }
};
*/

export { OriginId };
