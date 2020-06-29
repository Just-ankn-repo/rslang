export default class WordsModel {
  constructor(words, settings) {
    this.state = this.constructor.getInitialState(settings);
    this.words = this.getWordsList(words);
  }

  static getInitialState(settings) {
    return {
      currentWord: 0,
      settings,
    };
  }

  getWordsList(words) {
    const wordsList = words.slice(0, this.state.settings.wordsLimit);
    wordsList.map((word) => ({
      audio: word.audio,
      image: word.image,
      textExample: word.textExample,
      textExampleTranslate: word.textExampleTranslate,
      textMeaning: word.textMeaning,
      textMeaningTranslate: word.textMeaningTranslate,
      transcription: word.transcription,
      word: word.word,
      wordTranslate: word.wordTranslate,
      currentStep: word.optional ? word.optional.step || 0 : 0,
    }));

    return wordsList;
  }
} 