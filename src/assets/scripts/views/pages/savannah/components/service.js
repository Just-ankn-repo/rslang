import constants from './constants';

const WORDS_LIST_URL = 'https://afternoon-falls-25894.herokuapp.com/words';

export default class Service {
  static getQuestionsList(langLevel = constants.DEFAULT_LEVEL, round = constants.DEFAULT_ROUND) {

    return fetch(`${WORDS_LIST_URL}?page=${round}&group=${langLevel}`)
      .then((response) => response.json());
  }
}