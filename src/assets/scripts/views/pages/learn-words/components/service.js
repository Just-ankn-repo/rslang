const WORDS_LIST_URL = 'https://afternoon-falls-25894.herokuapp.com/words';

export default class Service {
  static getWords(langLevel = 0, round = 0) {

    return fetch(`${WORDS_LIST_URL}?page=${round}&group=${langLevel}`)
      .then((response) => response.json());
  }

  static getSettings() {
    return {
      wordsLimit: 10,
      newWordsLimit: 5,
      cardContent: {
        wordTranslate: true,
        textMeaning: true,
        textExample: true,
        transcription: true,
        image: true,
      },
    };
  }
}