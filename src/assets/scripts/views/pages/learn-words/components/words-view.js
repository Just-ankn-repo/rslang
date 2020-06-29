import constants from './constants';

export default class WordsView {
  constructor(words, state) {
    this.words = words;
    this.state = state;
    this.root = null;
    this.init();
  }

  init() {
    this.root = document.querySelector('#app_container');
    this.root.innerHTML = '';
    this.renderCard();
  }

  renderCard() {
    const cardData = this.words[this.state.currentWord];
    const template = this.getCardTemplate(cardData);
    const cardElem = document.createElement('section');

    cardElem.classList.add('learn-card');
    cardElem.innerHTML = template;
    this.constructor.hideWordInSentences(cardElem);
    this.root.append(cardElem);
  }

  getCardTemplate(cardData) {
    return `
      <div class='learn-card-header'>
      </div>
      <div class='card-main-content'>
        ${this.state.settings.cardContent.image
          ? `<div class='word-img-wrapper'>
                <img src='${constants.DATA_URL}${cardData.image}'>
              </div>`
          : ''}
        <div class='learn-word'>
          <div class='word-answer-wrapper'>
            <div class='word-answer'>
              ${cardData.word}
            </div>
            <input class='word-answer-input' name='word-answer-input'>
          </div>
        </div>
      </div>
      <ul class='learn-word-info'>
        <li class='word-content-item learn-translate-wrapper'>
        ${this.state.settings.cardContent.wordTranslate
          ? `<div class='learn-word-translate hide'>
          ${cardData.wordTranslate}
          </div>`
          : ''}
          ${this.state.settings.cardContent.transcription
            ? `<div class='learn-word-transcription hide'>
                ${cardData.transcription}
              </div>`
            : ''}
        </li>
          ${this.state.settings.cardContent.textMeaning
          ? `<li class='word-content-item'>
              <div class='word-meaning'>
                ${cardData.textMeaning}
              </div>
              <div class='word-meaning--translate hide'>
                ${cardData.textMeaningTranslate}
              </div>
            </li>`
          : ''}
          ${this.state.settings.cardContent.wordTranslate
          ? `<li class='word-content-item'>
              <div class='word-example'>
                ${cardData.textExample}
              </div>
              <div class='word-example--translate hide'>
                ${cardData.textExampleTranslate}
              </div>
            </li>`
          : ''}
      </ul>`;
  }

  static hideWordInSentences(cardElem) {
    const meaningSentenceWord = cardElem.querySelectorAll('.word-meaning i');
    const exampleSentenceWord = cardElem.querySelectorAll('.word-example b');

    meaningSentenceWord.forEach((word) => word.classList.add('key-word-in-sentence'));
    exampleSentenceWord.forEach((word) => word.classList.add('key-word-in-sentence'));
  }
}