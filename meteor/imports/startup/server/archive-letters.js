import { Meteor } from 'meteor/meteor';
import currentSystemConfig from './system-config';

import { Letters } from '../../api/letters/letters';
import { LettersArchive } from '../../api/letters/lettersArchive';

const runArchiveLetters = function () {
  console.log('run letters archiving');
  const config = currentSystemConfig.getConfig();
  const map_letter_decay_time = config.map_letter_decay_time;

  // move old letters to archive
  let bulkInsert = LettersArchive.rawCollection().initializeUnorderedBulkOp();
  let bulkRemove = Letters.rawCollection().initializeUnorderedBulkOp();
  const x = 5000;
  let counter = 0;
  const date = new Date();
  date.setSeconds(date.getSeconds() - map_letter_decay_time);
  Letters.find({ created_at: { $lte: date } }).forEach(
    function (doc) {
      bulkInsert.insert(doc);
      bulkRemove.find({ _id: doc._id }).removeOne();
      counter++;
      if (counter % x == 0) {
        bulkInsert.execute();
        bulkRemove.execute();
        bulkInsert = LettersArchive.rawCollection().initializeUnorderedBulkOp();
        bulkRemove = Letters.rawCollection().initializeUnorderedBulkOp();
      }
    },
  );
  if (counter > 0) {
    bulkInsert.execute();
    bulkRemove.execute();
  }
  console.log(`Archiving ${counter} letters`);
};

const continuouslyArchiveLetters = () => {
  const interval = currentSystemConfig.getConfig().archive_letters_interval;
  console.log(`Next letter archiving in ${interval}s`);
  Meteor.setTimeout(() => {
    runArchiveLetters();
    continuouslyArchiveLetters();
  }, interval * 1000);
};

console.log('starting regular letter archiving.');
continuouslyArchiveLetters();
