export default class WordsModel {
  constructor(words, settings) {
    this.state = this.constructor.getInitialState(settings);
    this.words = this.getWordsList(words);
    this.isCardsOver = false;
  }

  static getInitialState(settings) {
    return {
      currentWord: 0,
      settings,
    };
  }

  getWordsList(words) {
    const wordsList = words.slice(0, this.state.settings.wordsPerDay);
    wordsList.map((word) => ({
      id: word.id,
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

  updateStateOnNewCard() {
    if (this.currentWord >= this.state.settings.wordsPerDay - 1) {
      this.isCardsOver = true;
      return
    }

    this.state.currentWord += 1;
  }
} 