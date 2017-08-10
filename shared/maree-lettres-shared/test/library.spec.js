/* global describe, it, before */

import chai from 'chai';
import { OriginId } from '../lib/maree-lettres-shared.js';
import config from '../src/config.js';

chai.expect();

const expect = chai.expect;

let s = 'some origin';
let enc = OriginId.generateFromString(s);

describe('when encrypting from string', () => {
  it('should return a string', () => {
    // console.log(enc);
    expect(enc).to.be.a('string');
  });
});

describe('when decrypting', () => {
  it('should return the original string plus identifier', () => {
    let dec = OriginId.decryptRaw(enc);

    // console.log(dec);
    expect(dec).to.equal(s + '-' + config.user_key_other_code);
  });
  it('should return the original string', () => {
    let ori = OriginId.getOrigin(enc);

    // console.log(ori);
    expect(ori).to.equal(s);
  });
  it('should return the correct type', () => {
    let typ = OriginId.getOriginType(enc);

    // console.log(dec);
    expect(typ).to.equal('other');
  });
});

describe('when veryfying', () => {
  it('should verify a correct code', () => {
    let ver = OriginId.verify(enc);

    // console.log(dec);
    expect(ver).to.equal(true);
  });
  it('sould falsify a wrong code', () => {
    let ver = OriginId.verify('422b68d097d02c3712a687x6643c1556cc5d');

    // console.log(dec);
    expect(ver).to.equal(false);
  });
});
