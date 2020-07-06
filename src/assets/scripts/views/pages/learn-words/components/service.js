const WORDS_LIST_URL = 'https://afternoon-falls-25894.herokuapp.com/words';

export default class Service {
  static getWords(langLevel = 0, round = 0) {

    return fetch(`${WORDS_LIST_URL}?page=${round}&group=${langLevel}`)
      .then((response) => response.json());
  }

  static getSettings() {
    return {
      wordsPerDay: 10,
      optional: {
        newWordsPerDay: 5,
        cardContent: {
          wordTranslate: true,
          textMeaning: true,
          textExample: true,
          audioMeaning: true,
          audioExample: true,
          transcription: true,
          image: true,
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
}