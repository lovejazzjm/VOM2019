/* eslint-disable no-useless-concat */
import { compose } from 'redux';

const sortByDate = (field) => (a, b) => new Date(b[field]) - new Date(a[field]);

const sortByString = (field) => (a, b) =>
  a[field].toLowerCase() < b[field].toLowerCase() ? -1 : 1;

const sortByNumber = (field) => (a, b) => b[field] - a[field];

const whichSort = (type, field) =>
  type === 'date'
    ? sortByDate(field)
    : type === 'string'
    ? sortByString(field)
    : sortByNumber(field);

export const sortFunction = (sort) =>
  sort === 'SORTED_BY_TITLE'
    ? whichSort('string', 'title')
    : sort === 'SORTED_BY_RATING'
    ? whichSort('number', 'rating')
    : whichSort('date', 'timestamp');

const getSortState = (
  sortBy = 'date',
  stateHash = {
    date: 'SORTED_BY_DATE',
    title: 'SORTED_BY_TITLE',
    rating: 'SORTED_BY_RATING',
  },
) => stateHash[sortBy];

const locateSortFunction = compose(
  sortFunction,
  getSortState,
);

export const sortColors = (colors, sortBy) =>
  compose(
    (fn) => [...colors].sort(fn),
    locateSortFunction,
  )(sortBy);

export const getFirstArrayItem = (array) => array[0];

export const filterArrayById = (array, id) =>
  array.filter((item) => item.id === id);

export const findById = compose(
  getFirstArrayItem,
  filterArrayById,
);

// 영어로 되어있는 시간 표현을 한글로 바꿈
const 초 = 1000,
  분 = 60 * 초,
  시간 = 60 * 분,
  일 = 24 * 시간,
  timeframe = { 초, 분, 시간, 일 },
  breakpoints = {
    초: 60,
    분: 60,
    시간: 24,
    일: 30,
  };

const toDate = (timeStampString) => new Date(timeStampString);

const getDiff = (timestamp, now) => toDate(now) - toDate(timestamp);

const isUnderTime = (diff, timeframe, time) => diff / timeframe < time;

const diffOverTimeframe = (diff, timeframe) => Math.floor(diff / timeframe);

const printResult = (result, timeframeName) => `${result}${timeframeName}`; // 우리말은 `초`에 복수 필요 없음

const checkDate = (diff, timeframeName, underTime, timeframe) =>
  isUnderTime(diff, timeframe[timeframeName], underTime)
    ? printResult(
        diffOverTimeframe(diff, timeframe[timeframeName]),
        timeframeName,
      )
    : null;
/*
const printFullDate = dateTime =>
    `${dateTime.getMonth() + 1}/${dateTime.getDate()}/${dateTime.getFullYear()}`
*/
// 날짜를 UTC 기준으로 표시
const printFullUTCDate = (dateTime) =>
  `${dateTime.getUTCMonth() +
    1}/${dateTime.getUTCDate()}/${dateTime.getUTCFullYear()}`;

const lessThanAMinute = (timeString) =>
  // 단위가 초이고 60초 아래인 경우에만 1분 이내라고 표시
  timeString.match(/초/) && parseFloat(timeString) <= 60
    ? '1분 이내'
    : timeString + ' 이전';

const _checkNext = (result, callback) =>
  result ? lessThanAMinute(result) : callback();

const checkNext = ([tfName, ...rest], timeframe, timestamp, now) =>
  _checkNext(
    checkDate(getDiff(timestamp, now), tfName, breakpoints[tfName], timeframe),
    () => howLongAgo(rest, timeframe, timestamp, now),
  );

const howLongAgo = (remainingTimeframe, timeframe, timestamp, now) =>
  !remainingTimeframe.length
    ? printFullUTCDate(toDate(timestamp))
    : checkNext(remainingTimeframe, timeframe, timestamp, now);

export const ago = (timestamp, now = new Date().toString()) =>
  howLongAgo(Object.keys(timeframe), timeframe, timestamp, now);

export const siblings = (t) =>
  [...t.parentElement.children].filter((e) => e !== t);

export const addComma = (value, size = 2) => {
  const regComma = /(\d+)(\d{3})/;

  value += '';
  var x = value.split('.'),
    x1 = x[0],
    x2 = x.length > 1 ? '.' + x[1] : '';

  while (regComma.test(x1)) {
    x1 = x1.replace(regComma, '$1' + ',' + '$2');
  }
  return x1 + x2;
};

export const zeroPad = (value, size = 2, ch = '0') => {
  const sign = value < 0 ? '-' : '';
  let result = String(Math.abs(value));

  ch || (ch = '0');
  size || (size = 2);

  if (result.length >= size) {
    return sign + result.slice(-size);
  }
  while (result.length < size) {
    result = ch + result;
  }
  return sign + result;
};
