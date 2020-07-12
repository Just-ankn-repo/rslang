import WordsModel from './words-model';
import WordsView from './words-view';
import Service from './service';
import constants from './constants';
import Statistic from './statistic';

export default class WordsController {
  constructor(words, settings) {
    this.words = words;
    this.settings = settings;
    this.model = null;
    this.view = null;
    this.init();
  }

  init() {
    this.model = new WordsModel(this.words, this.settings);
    this.view = new WordsView(this.model.words, this.model.state);
    this.statistic = new Statistic(this.words, this.settings);
    this.bind();
  }

  bind() {
    this.view.onUserAnswer = (wordId, isCorrect, isGuessedFromFirstAttempt) => {
      if (isCorrect) {
        Service.saveCorrectAnswer(wordId);

        if (isGuessedFromFirstAttempt) {
          this.statistic.increaseCorrectAnswersCounter();
        }

        this.model.increaseCurrentCardProgress();
        this.model.updateStateOnNewCard();

        if (this.model.isCardsOver) {
          this.view.onCardsOver();
        }
      } else {
        Service.saveWrongAnswer(wordId);
        this.statistic.resetCorrectStreak();
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
      this.statistic.resetCorrectStreak();
      this.model.updateStateOnNewCard();

      if (this.model.isCardsOver) {
        this.view.onCardsOver();
      }
    }

    this.view.onSoundSwitch = (shouldEnable) => {
      this.model.switchSound(shouldEnable);
    }

    this.view.settingsPopup.onUserSettingsChange = (userSettings) => {
      Service.onContentSettingsChange(userSettings);
      this.model.updateCardContentSettings(userSettings);
      this.view.updateCurrentCard();
    };

    this.view.onCardsSetCompleted = () => {
      this.statistic.render();
    }
  }
}