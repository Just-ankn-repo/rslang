import constants from './constants';

export default class WordsView {
  constructor(words, state) {
    this.words = words;
    this.state = state;
    this.root = null;
    this.init();
  }

  init() {
    const appContainer = document.querySelector('#app_container');
    appContainer.innerHTML = `
      <section class='learn-words-container'>
        <div class='word-card-wrapper'></div>
        <button class='learn-next-card-btn'>next</button>
      </section>`;
    this.root = appContainer.querySelector('.word-card-wrapper');
    this.renderCard();
    this.nextCardBtnHandler = this.nextCardBtnHandler.bind(this);
    this.bind();
  }

  bind() {
    const toNextCardBtn = document.querySelector('.learn-next-card-btn');

    toNextCardBtn.addEventListener('click', this.nextCardBtnHandler);
  }

  renderCard() {
    this.currentCardData = this.words[this.state.currentWord];
    const template = this.getCardTemplate(this.currentCardData);

    this.currentCardElem = document.createElement('div');

    this.currentCardElem.classList.add('learn-card', 'closed');
    this.currentCardElem.innerHTML = template;
    this.constructor.hideWordInSentences(this.currentCardElem);
    this.root.innerHTML = '';
    this.root.append(this.currentCardElem);
    this.answerInput = document.querySelector('.word-answer-input');
    this.answerInput.focus();
  }

  getCardTemplate(cardData) {
    return `
      <div class='answer-indicator'></div>
      <div class='learn-card-header'>
      </div>
      <div class='card-main-content'>
        ${this.state.settings.optional.cardContent.image
          ? `<div class='word-img-wrapper'>
                <img src='${constants.DATA_URL}${cardData.image}'>
              </div>`
          : ''}
        <div class='learn-word'>
          <div class='word-answer-wrapper'>
            <div class='word-answer'>
              ${cardData.word.split('')
                .map((letter) => `
                  <span class='answer-letter'>
                    ${letter}
                  </span>`)
                .join('')}
            </div>
            <input class='word-answer-input' name='word-answer-input'>
          </div>
        </div>
      </div>
      <ul class='learn-word-info'>
        <li class='word-content-item learn-translate-wrapper'>
        ${this.state.settings.optional.cardContent.wordTranslate
          ? `<div class='learn-word-translate hide'>
          ${cardData.wordTranslate}
          </div>`
          : ''}
          ${this.state.settings.optional.cardContent.transcription
            ? `<div class='learn-word-transcription hide'>
                ${cardData.transcription}
              </div>`
            : ''}
        </li>
          ${this.state.settings.optional.cardContent.textMeaning
          ? `<li class='word-content-item'>
              <div class='word-meaning'>
                ${cardData.textMeaning}
              </div>
              <div class='word-meaning--translate hide'>
                ${cardData.textMeaningTranslate}
              </div>
            </li>`
          : ''}
          ${this.state.settings.optional.cardContent.wordTranslate
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

  nextCardBtnHandler() {
    const userAnswer = this.answerInput.value.toLowerCase();
    const rightAnswer = this.currentCardData.word.toLowerCase();
    const answerResult = this.checkLetters(userAnswer, rightAnswer);

    if (answerResult === 'answerCorrect') {
      this.currentCardElem.querySelector('.answer-indicator').addEventListener('transitionend', () => {
        this.onUserAnswer(this.currentCardData.id, true);
      }, {once: true});

      this.openCard();
    } else {
      this.onUserAnswer(this.currentCardData.id, false);
      setTimeout(() => {
        this.animateOnWrongAnswer();
      }, 1000);
    }
  }

  animateOnWrongAnswer() {
    const wordAnswer = document.querySelector('.word-answer');
    this.answerInput.addEventListener('input', () => {
      wordAnswer.classList.remove('faint');
    }, { once: true });

    wordAnswer.className = 'word-answer faint';
    [...document.querySelectorAll('.answer-letter')]
      .forEach((item) => {
        const letter = item;
        letter.className = 'answer-letter';
      });
    this.answerInput.focus();
  }

  onUserAnswer() {
    throw new Error('method should be overriden', this);
  }

  onCardsOver() {
    alert('cards limit was reached');
  }

  showNextCard() {
    this.renderCard();
  }

  openCard() {
    this.currentCardElem.classList.remove('closed');
  }

  checkLetters(userAnswer, rightAnswer) {
    // const rightLettersList = rightAnswer.split('');
    const userLettersList = userAnswer.split('');
    const solvedLetterIndexList = this.constructor.findCorrectLetters(userLettersList, rightAnswer);
    const rightAnswerWrap = document.querySelector('.word-answer');
    const errorsAmount = rightAnswer.length - solvedLetterIndexList.length;
    const answerResult = this.constructor.getAnswerResult(userAnswer, rightAnswer, errorsAmount);

    switch (answerResult) {
      case 'answerCorrect':
        rightAnswerWrap.classList.add('answer-correct');
        break;
      case 'mediumErrors':
        rightAnswerWrap.classList.add('medium-errors');
        break;
      default:
        rightAnswerWrap.classList.add('many-errors');
    }
    // if (
    //     errorsAmount === 0
    //     && userAnswer.length === rightAnswer.length
    //   ) {
    //     rightAnswerWrap.classList.add('answer-correct');
    // } else if (errorsAmount + (userAnswer.length - rightAnswer.length) <= 2) {
    //   rightAnswerWrap.classList.add('medium-errors');
    // } else {
    //   rightAnswerWrap.classList.add('many-errors');
    // }

    const answerLetters = document.querySelectorAll('.answer-letter');
    [...answerLetters].forEach((letter, index) => {
      if (solvedLetterIndexList.includes(index)) {
        letter.classList.add('letter-correct');
      } else {
        letter.classList.add(`${errorsAmount > 2
            ? 'many-errors'
            : 'medium-errors'}`);
      }
    });
    this.answerInput.value = '';

    return answerResult;
  }

  static getAnswerResult(userAnswer, rightAnswer, errorsAmount) {
    let result;
    if (
      errorsAmount === 0
      && userAnswer.length === rightAnswer.length
    ) {
      result = 'answerCorrect';
    } else if (errorsAmount + Math.abs(userAnswer.length - rightAnswer.length) <= 2) {
      result = 'mediumErrors';
    } else {
      result = 'manyErrors';
    }
    return result;
  }

  static findCorrectLetters(userLettersList, rightAnswer) {
    const solvedLetterIndexList = [];

    let lastSolvedLetterIndex = -1;
    for (let i = 0; i < userLettersList.length; i += 1) {
      // const solvedLetterIndex = rightLettersList.findIndex((rightLetterItem) => {
      //   return rightLetterItem === userLettersList[i];
      // });
      const solvedLetterIndex = rightAnswer.indexOf(userLettersList[i], lastSolvedLetterIndex + 1);

      if (solvedLetterIndex !== -1) {
        lastSolvedLetterIndex = solvedLetterIndex;
        solvedLetterIndexList.push(solvedLetterIndex);
      }
    }
    console.log(solvedLetterIndexList);
    return solvedLetterIndexList;
  }
}