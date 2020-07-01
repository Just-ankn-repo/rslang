class Card {
  constructor({ word, wordTranslate, transcription, image, audio }) {
    this.word = word;
    this.wordTranslate = wordTranslate;
    this.transcription = transcription;
    this.image = image;
    this.audio = audio;
    this.speech = new Audio(`https://raw.githubusercontent.com/ValeriaKorzhenevskaya/rslang-data/master/${this.audio}`)
  }

  generateDivForCards() {
    let template = '';
    const div = document.createElement('div');
    div.className = 'item';
    div.id = `${this.word.toLowerCase()}`;
    template += '<object class="audio-icon">';
    template += '</object>';
    template += '<div class="transcript">';
    template += `<p class="word">${this.word}</p>`;
    template += `<p class="transcription">${this.transcription}</p>`;
    template += '</div>';

    div.innerHTML = template;

    const activeCard = () => {
      this.speech.play();
      document.querySelector('.translation').innerHTML = this.wordTranslate;
      this.changeImage()
    }
    div.addEventListener('click', activeCard);

    return div;
  }

  generateDivForStatistic() {
    let template = '';
    const div = document.createElement('div');
    div.className = 'statistic-item';
    div.id = `${this.word}`;

    template += '<object class="audio-icon"></object>';
    template += `<p class="statistic-word">${this.word}</p>`;
    template += `<p class="statistic-transcription">${this.transcription}</p>`;
    template += `<p class="statistic-translate">${this.wordTranslate}</p>`;

    div.innerHTML = template;

    const speechPlay = () => {
      this.speech.play();
    }
    div.addEventListener('click', speechPlay);

    return div;
  }

  changeImage() {
    document.querySelector('.image').setAttribute('src', `https://raw.githubusercontent.com/ValeriaKorzhenevskaya/rslang-data/master/${this.image}`)
  }

  disable() {
    this.div.removeEventListener('click', this.activeCard);
  }

  enable() {
    this.div.addEventListener('click', this.activeCard);
  }
}

export default Card
