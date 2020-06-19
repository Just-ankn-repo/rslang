const PAGES_RANGE = {
  min: 0,
  max: 29,
}

const GROUPS_RANGE = {
  level: {
    slow: [0, 1],
    moderate: [2, 3],
    fast: [4, 5],
  }
}

function getRandomNumber(min, max) {
  const rand = min + Math.random() * (max + 1 - min);

  return Math.floor(rand);
}

function getWordsGroup(level) {
  const groupsIndexList = GROUPS_RANGE.level[level];
  const min = groupsIndexList[0];
  const max = groupsIndexList[groupsIndexList.length - 1];

  return getRandomNumber(min, max);
}

const WORDS_LIST_URL = 'https://afternoon-falls-25894.herokuapp.com/words';

export default class Service {
  static getQuestionsList(level = 'slow') {
    const page = getRandomNumber(PAGES_RANGE.min, PAGES_RANGE.max);
    const group = getWordsGroup(level);

    return fetch(`${WORDS_LIST_URL}?page=${page}&group=${group}`)
      .then((response) => response.json());
  }
}