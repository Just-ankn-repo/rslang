import WordsModel from './words-model';
import WordsView from './words-view';
import Service from './service';

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

        this.model.updateStateOnNewCard();
        if (this.model.isCardsOver) {
          this.view.onCardsOver();
        } else {
          this.view.showNextCard();
        }
      } else {
        Service.saveWrongAnswer(wordId);
      }
    }
  }
}