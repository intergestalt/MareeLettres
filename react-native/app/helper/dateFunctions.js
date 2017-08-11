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
  return formatDateEn(date, finished, sameDay, sameYear);
}

export function formatDate(endUTC, nowUTC, locale) {
  let sameYear = false;
  let sameDay = false;

  const endYear = endUTC.getFullYear();
  const endMonth = endUTC.getMonth();
  const endDay = endUTC.getDate();

  const nowYear = nowUTC.getFullYear();
  const nowMonth = nowUTC.getMonth();
  const nowDay = nowUTC.getDate();

  if (nowYear === endYear) {
    sameYear = true;
    if (nowMonth === endMonth && nowDay === endDay) {
      sameDay = true;
    }
  }

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
export function formatDiff(diff) {
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
  return '(00:00:00)';
}

export function getDateData(endUTC, language) {
  const nowUTC = new Date(); // Now in what time zone ever
  const mNowUTC = nowUTC.getTime();

  const mEndUTC = endUTC.getTime();
  const diff = mEndUTC - mNowUTC;

  let finished = false;
  if (diff <= null) finished = true;
  const result = {
    endString: formatDate(endUTC, nowUTC, language),
    tickerString: formatDiff(diff),
    finished,
  };
  return result;
}

export function isFinished(endDate) {
  const nowUTC = new Date(); // Now in what time zone ever
  const mNowUTC = nowUTC.getTime();

  const mEndUTC = endDate.getTime();
  const diff = mEndUTC - mNowUTC;

  let finished = false;
  if (diff <= 0) finished = true;
  return finished;
}
