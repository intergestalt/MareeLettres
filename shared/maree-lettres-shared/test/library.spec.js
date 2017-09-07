/* global describe, it, before */

import chai from 'chai';
import { OriginId, DeviceIdException, AvailableLetters, systemConfigDefaults } from '../lib/maree-lettres-shared.js';
import config from '../src/config/config.js';

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

describe('when encrypting from deviceId', () => {
  it('should accept a string', () => {
    // console.log(enc);
    expect(OriginId.generateFromDeviceId('12345-lseirufshker')).to.be.a('string');
  });
  it('should reject a short string', () => {
    // console.log(enc);
    expect(OriginId.generateFromDeviceId.bind('123d5')).to.throw(DeviceIdException);
  });
  it('should reject an empty string', () => {
    // console.log(enc);
    expect(OriginId.generateFromDeviceId.bind('')).to.throw(DeviceIdException);
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

describe('when accessing available proposal letter set', () => {
  it('should return a string', () => {
    let letters = AvailableLetters.proposal;

    expect(letters).to.be.a('string');
  });
});

describe('when getting systemConfig default values', () => {
  it('should return the values object', () => {
    let obj = systemConfigDefaults.valuesObject();
    console.log(obj)
    expect(obj).to.be.a('object');
  });
});
