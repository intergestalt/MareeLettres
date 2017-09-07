import systemConfigDefaults from './config/systemConfigDefaults.js';

systemConfigDefaults.valuesObject = function () {
    let obj = {};

    Object.keys(this).forEach((key) => {
        if (typeof this[key] === 'function') return;
        obj[key] = this[key].defaultValue;
    });
    return obj;
};

export default systemConfigDefaults;
