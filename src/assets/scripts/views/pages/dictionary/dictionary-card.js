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
    // template += '<object class="audio-icon"></object>';
    template += `<img src="https://raw.githubusercontent.com/ValeriaKorzhenevskaya/rslang-data/master/${this.image}" class="dictionary-element__image">`;
    template += `<div class="dictionary-element__word">${this.word}</div>`;
    // template += `<div class="dictionary-element__transcription">${this.transcription}</div>`;
    template += `<div class="dictionary-element__translation">${this.wordTranslate}</div>`;
    template += `</div>`;
    template += `<div class="dictionary-element__layout_second">`;
    template += `<object class="dictionary-element__trash"></object>`;
    template += `</div>`;

    div.innerHTML = template;

    const playAudio = () => {
      this.speech.play();

    }
    div.addEventListener('click', playAudio);

    return div;
  }

  // generateModalWindow() {
  //   let template = '';
  //   const div = document.createElement('div');
  //   div.className = 'dictionary-card';
  //   div.id = `${this.word}`;
  //   template += `<img src="https://raw.githubusercontent.com/ValeriaKorzhenevskaya/rslang-data/master/${this.image}" class="dictionary-element__image">`;

  //   template += `<div class="dictionary-card__transcription"><object class="dictionary-card__audio-icon"></object>${this.transcription}</div>`;
  //   template += `<div class="dictionary-card__word">${this.word}</div>`;
  //   template += `<div class="dictionary-card__translation">${this.wordTranslate}</div>`;
  //   template += `<div class="dictionary-card__example">${this.textExample}</div>`;
  //   template += `<div class="dictionary-modal__arrows">`;
  //   template += '<object class="dictionary-modal__button_left"></object>';
  //   template += '<object class="dictionary-modal__button_right"></object';
  //   template += `</div>`;
  //   template += `<object class="dictionary-card__trash"></object>`;

  //   div.innerHTML = template;
  //   return div;
  // }
}

export default Card