import constants from './constants';

// function getRandomNumber(min, max) {
//   const rand = min + Math.random() * (max + 1 - min);

//   return Math.floor(rand);
// }

// function getWordsGroup(level) {
//   const groupsIndexList = constants.GROUPS_RANGE.level[level];
//   const min = groupsIndexList[0];
//   const max = groupsIndexList[groupsIndexList.length - 1];

//   return getRandomNumber(min, max);
// }

const WORDS_LIST_URL = 'https://afternoon-falls-25894.herokuapp.com/words';

export default class Service {
  static getQuestionsList(langLevel = 0, round = 0) {
    // const page = getRandomNumber(constants.PAGES_RANGE.min, constants.PAGES_RANGE.max);
    // const group = getWordsGroup(level);

    return fetch(`${WORDS_LIST_URL}?page=${round}&group=${langLevel}`)
      .then((response) => response.json());
  }
}