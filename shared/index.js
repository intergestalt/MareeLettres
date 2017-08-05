'use strict';

/*
* usage: 
* import shared from 'maree-lettres-shared';
* console.log(shared.userKeys.getBrowserUserKey());
*/

const config = require('./config.js').config;

const userKeys = {
  getBrowserUserKey: function() {
    const string = config.user_key_browser_code;
    return string;
  }
};

exports.userKeys = userKeys;
