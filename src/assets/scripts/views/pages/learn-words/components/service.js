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
          transcription: true,
          image: true,
        },
      }
    };
  }

  static saveCorrectAnswer(wordId) {
    console.log(wordId);
  }

  static saveWrongAnswer(wordId) {
    console.log(wordId);
  }
}