const monthNamesEn = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const monthNamesFr = [
  'Jan',
  'Fév',
  'Mar',
  'Avr',
  'Mai',
  'Jun',
  'Jul',
  'Aoû',
  'Sep',
  'Oct',
  'Nov',
  'Déc',
];

export const TICKER_END = '(00:00:00)';

function getParisTime(date) {
  const year = date.getFullYear();

  let summerDay = 26;
  let winterDay = 26;
  if (year === 2017) {
    summerDay = 26;
    winterDay = 29;
  } else if (year === 2018) {
    summerDay = 25;
    winterDay = 28;
  } else if (year === 2019) {
    summerDay = 31;
    winterDay = 27;
  } else if (year === 2020) {
    summerDay = 29;
    winterDay = 25;
  }
  const keyDateSummerString = `${year}-03-${summerDay}T02:00:00.000Z`;
  const keyDateWinterString = `${year}-10-${winterDay}T03:00:00.000Z`;
  const keyDateSummer = new Date(Date.parse(keyDateSummerString));
  const keyDateWinter = new Date(Date.parse(keyDateWinterString));
  if (date >= keyDateSummer && date <= keyDateWinter) {
    // summertime +2h zu UTC
    const milliseconds = date.getTime() + 7200000;
    return new Date(milliseconds);
  }
  const milliseconds = date.getTime() + 3600000; // wintertime +2h zu UTC
  return new Date(milliseconds);
}

function formatDateEn(date, finished, sameDay, sameYear) {
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth();
  const day = date.getUTCDate();
  let hours = date.getUTCHours();
  const min = date.getUTCMinutes();

  let result = '';
  if (finished) {
    // Past
    result = 'Ended ';
  } else {
    // futur
    result = 'Ends ';
  }

  // Today or not today
  if (sameDay) {
    // Today
    result += 'today ';
  } else {
    // Not Today
    result += 'on ';
    result += `${monthNamesEn[month]} `;
    if (day < 10) {
      result += '0';
    }
    result += `${day} `;
    if (!sameYear) {
      result += year;
      result += ' ';
    }
  }

  result += 'at ';

  let pm = false;
  // Time is not depending on futur or past
  if (hours > 12) {
    // pm
    hours -= 12;
    pm = true;
  }

  result += hours;
  if (min !== 0) {
    result += ':';
    if (min < 10) {
      result += '0';
    }
    result += min;
  }

  if (pm) {
    // pm
    result += 'pm';
  } else {
    // am
    result += 'am';
  }

  return result;
}

function formatDateFr(date, finished, sameDay, sameYear) {
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth();
  const day = date.getUTCDate();
  const hours = date.getUTCHours();
  const min = date.getUTCMinutes();

  let result = '';
  if (finished) {
    // Past
    result = 'Terminé ';
  } else {
    // futur
    result = 'Se terminant ';
  }

  // Today or not today
  if (sameDay) {
    // Today
    result += "aujourd'hui ";
  } else {
    // Not Today
    result += 'le ';
    result += `${monthNamesFr[month]} `;
    if (day < 10) {
      result += '0';
    }
    result += `${day} `;
    if (!sameYear) {
      result += year;
      result += ' ';
    }
  }

  result += 'à ';

  result += hours;
  if (min !== 0) {
    result += ':';
    if (min < 10) {
      result += '0';
    }
    result += min;
  }

  return result;
}

export function formatDate(endUTC, nowUTC, sameYear, sameDay, locale) {
  const endLocal = getParisTime(endUTC);

  let finished = true;
  if (endUTC > nowUTC) {
    finished = false;
  }
  if (locale === 'fr') {
    return formatDateFr(endLocal, finished, sameDay, sameYear);
  }
  return formatDateEn(endLocal, finished, sameDay, sameYear);
}

function addNumber(res, num, doublePoint) {
  let result = res;
  if (num >= 0) {
    if (num < 10) {
      result += '0';
    }
    result += num;
    if (doublePoint) {
      result += ':';
    }
  }
  return result;
}
export function getTickerString(diff) {
  let myDiff = diff;
  if (myDiff > 0) {
    // Future
    const d = Math.trunc(myDiff / 86400000);
    const dMilis = d * 1000 * 60 * 60 * 24;
    myDiff -= dMilis;
    const h = Math.trunc(myDiff / 3600000);
    const hMilis = h * 1000 * 60 * 60;
    myDiff -= hMilis;
    const m = Math.trunc(myDiff / 60000);
    const mMilis = m * 1000 * 60;
    myDiff -= mMilis;
    const s = Math.trunc(myDiff / 1000);
    let result = '';

    result = addNumber(result, d, true);
    result = addNumber(result, h, true);
    result = addNumber(result, m, true);
    result = addNumber(result, s, false);
    return `(${result})`;
  }
  return TICKER_END;
}

export function isFinished(challenge) {
  const endDate = new Date(challenge.end_date);
  const nowUTC = new Date(); // Now in what time zone ever
  const mNowUTC = nowUTC.getTime();

  const mEndUTC = endDate.getTime();
  const diff = mEndUTC - mNowUTC;

  let finished = false;
  if (diff <= 0) finished = true;
  return finished;
}
export function isFinishedSuggest(challenge) {
  const endDate = new Date(challenge.end_date);
  const nowUTC = new Date(); // Now in what time zone ever
  const mNowUTC = nowUTC.getTime();

  let mEndUTC = endDate.getTime();
  mEndUTC -= DYNAMIC_CONFIG.SUGGESTIONS_CLOSE_EARLIER;

  const diff = mEndUTC - mNowUTC;

  let finished = false;
  if (diff <= 0) finished = true;
  return finished;
}

export function getTickerDataChallenge(endUTC, oldEntry) {
  const nowUTC = new Date(); // Now in what time zone ever
  const mNowUTC = nowUTC.getTime();

  const mEndUTC = endUTC.getTime();
  const diff = mEndUTC - mNowUTC;

  const endYear = endUTC.getFullYear();
  const endMonth = endUTC.getMonth();
  const endDay = endUTC.getDate();

  const nowYear = nowUTC.getFullYear();
  const nowMonth = nowUTC.getMonth();
  const nowDay = nowUTC.getDate();
  let sameYear = false;
  let sameDay = false;

  if (nowYear === endYear) {
    sameYear = true;
    if (nowMonth === endMonth && nowDay === endDay) {
      sameDay = true;
    }
  }

  let finished = false;
  if (diff <= null) finished = true;

  let endStringEn = null;
  let endStringFr = null;
  if (oldEntry) {
    endStringEn = oldEntry.endStringEn;
    endStringFr = oldEntry.endStringFr;
    if (
      oldEntry.lastFinished !== finished ||
      oldEntry.lastSameYear !== sameYear ||
      oldEntry.lastSameDay !== sameDay
    ) {
      endStringEn = null;
      endStringFr = null;
    }
  }
  let entryChanged = false;
  if (!finished) entryChanged = true;
  if (!endStringEn || !endStringFr) {
    endStringEn = formatDate(endUTC, nowUTC, sameYear, sameDay, 'en');
    endStringFr = formatDate(endUTC, nowUTC, sameYear, sameDay, 'fr');
    entryChanged = true;
  }
  const result = {
    timeLeft: diff,
    finished,
    endStringEn,
    endStringFr,
    lastFinished: finished,
    lastSameYear: sameYear,
    lastSameDay: sameDay,
    entryChanged,
  };
  if (entryChanged) {
    // console.log('CALCULATE');
    // console.log(result);
  }

  return result;
}

export function getTickerDataChallenges(challengeState, oldData) {
  const newChallengesTickerData = {};
  for (let i = 0; i < challengeState.challenges.length; i += 1) {
    const myChallenge = challengeState.challenges[i];
    let endDate = new Date(myChallenge.end_date);
    if (DEV_CONFIG.USE_CUSTOM_END_DATE) {
      if (myChallenge._id === DEV_CONFIG.CUSTOM_END_DATE_ID) {
        const customDate = DEV_CONFIG.CUSTOM_END_DATE;
        endDate = new Date(customDate);
      }
    }

    let newTimeLeftForChallenge = null;
    const oldEntry = oldData[myChallenge._id];
    newTimeLeftForChallenge = getTickerDataChallenge(endDate, oldEntry);
    if (newTimeLeftForChallenge.entryChanged) {
      newChallengesTickerData[myChallenge._id] = newTimeLeftForChallenge;
     } else {
      newChallengesTickerData[myChallenge._id] = oldEntry;
    }
  }
  return newChallengesTickerData;
}
