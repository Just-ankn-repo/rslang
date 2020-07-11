export default class WordsModel {
  constructor(words, settings) {
    this.state = this.constructor.getInitialState(settings);
    this.words = this.getWordsList(words);
    this.isCardsOver = false;
  }

  static getInitialState(settings) {
    return {
      currentWord: 0,
      isAudioOn: true,
      settings,
    };
  }

  getWordsList(words) {
    const wordsList = this.state.settings.wordsPerDay < words.length
      ? words.slice(0, this.state.settings.wordsPerDay)
      : words;
    const result = wordsList.map((word) => ({
      id: word.id,
      audio: word.audio,
      audioMeaning: word.audioMeaning,
      audioExample: word.audioExample,
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

    return result;
  }

  getCurrentWord() {
    return this.words[this.state.currentWord];
  }

  updateStateOnNewCard() {
    this.state.currentWord += 1;

    if (this.state.currentWord >= Math.min(this.state.settings.wordsPerDay, this.words.length)) {
      this.isCardsOver = true;
    }
  }

  increaseCurrentCardProgress() {
    this.getCurrentWord().currentStep += 1;
  }

  switchSound(shouldEnable) {
    this.state.isAudioOn = shouldEnable;
  }

  updateCardContentSettings(userSettings) {
    this.state.settings.optional.cardContent = userSettings;
  }
} 