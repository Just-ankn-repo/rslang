const WORDS_LIST_URL = 'https://afternoon-falls-25894.herokuapp.com/words';

export default class Service {
  static getWords(group = 0, page = 1) {

    return fetch(`${WORDS_LIST_URL}?page=${group}&group=${page}`)
      .then((response) => response.json());
  }

  static getSettings() {
    return {
      wordsPerDay: 50,
      optional: {
        newWordsPerDay: 30,
        cardContent: {
          image: true,
          wordTranslate: true,
          textMeaning: true,
          textExample: true,
          audioMeaning: true,
          audioExample: true,
          transcription: true,
          defineLevelOptions: true,
          deleteBtn: true,
          toHardListBtn: true,
          showAnswerBtn: true,
        },
      }
    };
  }

  static saveCorrectAnswer(wordId) {
    console.log(`correct answer on ${wordId}`);
  }

  static saveWrongAnswer(wordId) {
    console.log(`wrong answer on ${wordId}`);
  }

  static setWordDifficulty(difficulty) {
    console.log(`difficulty set to ${difficulty}`);
  }

  static markWordAsDifficult(wordId) {
    console.log(`${wordId} marked as difficult`);
  }

  static deleteWord(wordId) {
    console.log(`${wordId} was deleted`);
  }

  static onShowAnswerBtn(wordId) {
    console.log(`for ${wordId} solution was shown`);
  }

  static onContentSettingsChange(userSettings) {
    console.log(`content settings set to ${userSettings}`);
  }
}