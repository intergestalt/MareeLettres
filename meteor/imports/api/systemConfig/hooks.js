import { Meteor } from 'meteor/meteor';
import FastlyHelpers from '../../helpers/FastlyHelpers';
import { SystemConfig } from './systemConfig';
import buildConfig from '../../startup/both/build-config';

console.log('attach SystemConfig hooks');

SystemConfig.before.insert(function (userId, doc) {
  console.log("before insert")
  doc.updated_at = new Date();
});

SystemConfig.before.update(function (userId, doc, fieldNames, modifier, options) {
  console.log("before update", doc.name)
  if (typeof modifier.$set === "undefined") return;
  modifier.$set = modifier.$set || {};
  modifier.$set.updated_at = new Date();
  if (modifier.$set.active == false) {
    const q = buildConfig.currentSystemConfigQuery
    const count = SystemConfig.find(q.strict.selector, q.strict.options).count()
    console.log(count)
    if (count === 0) {
      modifier.$set.active = true
    }
  }
});

SystemConfig.after.update(function (userId, doc, fieldNames, modifier, options) {
  console.log("after update ", doc.name)
  if (doc.active === true) {
    const q = buildConfig.currentSystemConfigQuery
    const count = SystemConfig.find(q.relaxedMany.selector, q.relaxedMany.options).count()
    console.log(count)
    if (count > 1) {
      SystemConfig.update({ _id: { $ne: doc._id } }, { $set: { active: false } }, { multi: true })
    }
  }
});

SystemConfig.after.insert(function (userId, doc) {
  console.log("after insert")
  if (doc.active === true) {
    SystemConfig.update({ _id: { $ne: doc._id } }, { $set: { active: false } }, { multi: true })
  } else {
    const q = buildConfig.currentSystemConfigQuery
    const count = SystemConfig.find(q.strict.selector, q.strict.options).count()
    if (count === 0) {
      makeSomethingActive()
    }
  }

});

SystemConfig.before.remove(function (userId, doc) {
  console.log("before remove")
  if (doc.active === true) {
    const q = buildConfig.currentSystemConfigQuery
    const count = SystemConfig.find(q.relaxed.selector, q.relaxed.options).count()
    if (count > 1) {
      makeSomethingActive()
    }
  }
});

makeSomethingActive = function () {
  const q = buildConfig.currentSystemConfigQuery
  const docs = SystemConfig.find(q.relaxed.selector, q.relaxed.options)
  if (docs.count() === 0) return;
  const id = docs.fetch()[0]._id
  SystemConfig.update(id, { $set: { active: true } })
}

// fastly

if (Meteor.settings.use_fastly) {

  SystemConfig.after.insert(function () {
    FastlyHelpers.fastlyPurge('config');
  });

  SystemConfig.after.update(function () {
    FastlyHelpers.fastlyPurge('config');
  });

  SystemConfig.after.remove(function () {
    FastlyHelpers.fastlyPurge('config');
  });

};
