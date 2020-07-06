import WordsModel from './words-model';
import WordsView from './words-view';
import Service from './service';
import constants from './constants';

export default class WordsController {
  constructor(words, settings) {
    this.words = words;
    this.settings = settings;
    this.model = null;
    this.view = null;
    console.log(this.words);
    console.log(this.settings);
    this.init();
  }

  init() {
    this.model = new WordsModel(this.words, this.settings);
    this.view = new WordsView(this.model.words, this.model.state);
    this.bind();
  }

  bind() {
    this.view.onUserAnswer = (wordId, isCorrect) => {
      if (isCorrect) {
        Service.saveCorrectAnswer(wordId);
        this.model.increaseCurrentCardProgress();
        this.model.updateStateOnNewCard();
        if (this.model.isCardsOver) {
          this.view.onCardsOver();
        }
      } else {
        Service.saveWrongAnswer(wordId);
      }
    }

    this.view.onUserDefineWordLevel = (difficulty = constants.WORD_DEFAULT_LEVEL) => {
      Service.setWordDifficulty(difficulty);
    }

    this.view.onMarkWordAsDifficult = (wordId) => {
      Service.markWordAsDifficult(wordId);
    }

    this.view.onUserDeleteWord = (wordId) => {
      Service.deleteWord(wordId);
      this.model.updateStateOnNewCard();
      if (this.model.isCardsOver) {
        this.view.onCardsOver();
      }
    }

    this.view.onShowAnswerBtn = (wordId) => {
      Service.onShowAnswerBtn(wordId);
      this.model.updateStateOnNewCard();
      if (this.model.isCardsOver) {
        this.view.onCardsOver();
      }
    }

    this.view.onSoundSwitch = (shouldEnable) => {
      this.model.switchSound(shouldEnable);
    }
  }
}