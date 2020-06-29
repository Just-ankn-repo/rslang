import WordsModel from './words-model';
import WordsView from './words-view';

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
  }
}