/*
* usage:
* import shared from 'maree-lettres-shared';
* console.log(shared.userKeys.getBrowserUserKey());
*/
import Cryptr from 'cryptr';
import md5 from 'md5';

import config from './config/config.js';

const encryptor = new Cryptr(config.user_key_secret);
const min_length = 8;

function DeviceIdException(s) {
  this.message = `Invalid DeviceId "${s}" – minimum ${min_length} characters required.`;
  this.name = 'DeviceIdException';
}

const OriginId = {
  // user functions

  generateFromString(s) {
    const code = s + '-' + config.user_key_other_code;
    const encrypted = encryptor.encrypt(code);

    return encrypted;
  },

  generateFromDeviceId(s) {
    if (typeof s !== 'string' || s === '' || s.length < min_length) {
      throw new DeviceIdException(s);
    }

    const hash = md5(s);

    const code = hash + '-' + config.user_key_phone_code;
    const encrypted = encryptor.encrypt(code);

    return encrypted;
  },

  verify(origin_id) {
    let dec = '';

    try {
      dec = this.decryptRaw(origin_id);
    } catch (err) {
      return false;
    }

    const code = this.splitParts(dec).code;

    return code === config.user_key_phone_code || code === config.user_key_other_code;
  },

  getOrigin(origin_id) {
    const dec = this.decryptRaw(origin_id);
    const origin = this.splitParts(dec).origin;

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

export { OriginId, DeviceIdException };
