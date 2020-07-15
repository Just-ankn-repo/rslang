// import closeModalWindow from "./Control";

class Card {
  constructor({ word, wordTranslate, transcription, image, audio, textExample }) {
    this.word = word;
    this.wordTranslate = wordTranslate;
    this.transcription = transcription;
    this.image = image;
    this.audio = audio;
    this.textExample = textExample;
    this.speech = new Audio(`https://raw.githubusercontent.com/ValeriaKorzhenevskaya/rslang-data/master/${this.audio}`)
  }

  generateDivForCards() {
    let template = '';
    const div = document.createElement('div');
    div.className = 'dictionary-element';
    div.id = `${this.word}`;
    template += '<div class="dictionary-element__layout_first">';
    template += '<input type="checkbox" class="dictionary-element__checkbox">';
    template += `<img src="https://raw.githubusercontent.com/ValeriaKorzhenevskaya/rslang-data/master/${this.image}" class="dictionary-element__image">`;
    template += `<div class="dictionary-element__word">${this.word}</div>`;
    template += `<div class="dictionary-element__translation">${this.wordTranslate}</div>`;
    template += `</div>`;
    template += `<div class="dictionary-element__layout_second">`;
    template += `<object class="dictionary-element__trash"></object>`;
    template += `</div>`;

    div.innerHTML = template;

    const playAudio = (event) => {
      if (!event.target.classList.contains('dictionary-element__checkbox') 
      && !event.target.classList.contains('dictionary-element__trash')) {
        this.speech.play();
        this.renderModal();
      }
      
    }
    div.addEventListener('click', playAudio)
    return div;
  }

  renderModal() {
    const CLOSE_BTN = document.querySelector('.dictionary-modal__close-button')
    const MODAL_WINDOW = document.querySelector('.dictionary-modal')
    const IMAGE = document.querySelector('.dictionary-card__image');
    const TRANSCRIPT = document.querySelector('.dictionary-card__transcription');
    const TRANSLATE = document.querySelector('.dictionary-card__translation');
    const EXAMPLE = document.querySelector('.dictionary-card__example');

    IMAGE.setAttribute('src', `https://raw.githubusercontent.com/ValeriaKorzhenevskaya/rslang-data/master/${this.image}`) ;
    TRANSCRIPT.innerHTML = this.transcription;
    TRANSLATE.innerHTML = this.wordTranslate;
    EXAMPLE.innerHTML = this.textExample;
    MODAL_WINDOW.style.display = 'flex';

    CLOSE_BTN.addEventListener('click', () => {
      MODAL_WINDOW.style.display = 'none';
    })
  }
}

export default Card