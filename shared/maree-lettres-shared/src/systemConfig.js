import systemConfigDefaults from './config/systemConfigDefaults.js';

const MakeValuesObject = function (defaults) {
    let obj = {};

    Object.keys(defaults).forEach((key) => {
        if (typeof defaults[key] === 'function') return;
        obj[key] = defaults[key].defaultValue;
    });
    return obj;
};

const systemConfigInitial = MakeValuesObject(systemConfigDefaults);

export default { systemConfigDefaults, systemConfigInitial };
