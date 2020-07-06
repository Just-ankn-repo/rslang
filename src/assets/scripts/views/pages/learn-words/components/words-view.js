import constants from './constants';
import Player from './player';

export default class WordsView {
  constructor(words, state) {
    this.words = words;
    this.state = state;
    this.root = null;
    this.currentCardData = null;
    this.currentCardElem = null;
    this.player = new Player(this.state.isAudioOn);
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
    this.bind();
  }

  bind() {
    const toNextCardBtn = document.querySelector('.learn-next-card-btn');

    this.nextCardBtnHandler = this.nextCardBtnHandler.bind(this);
    this.nextCardKeyHandler = this.nextCardKeyHandler.bind(this);

    toNextCardBtn.addEventListener('click', this.nextCardBtnHandler);
    document.body.addEventListener('keydown', this.nextCardKeyHandler);
    this.addCardListeners();

    this.player.onAudioEnd = () => {
      if (!this.state.settings.optional.cardContent.defineLevelOptions) {
        this.showNextCard();
      }
    }

    // document.querySelector('.learn-word-sound').addEventListener('click', ({target}) => {
    //   if (target.classList.contains('learn-sound-off')) {
    //     target.classList.remove('learn-sound-off');
    //     this.onSoundSwitch(true);
    //   } else {
    //     target.classList.add('learn-sound-off')
    //     // target.classList.remove('active');
    //     this.player.pause();
    //     this.onSoundSwitch(false);
    //   }
    // });
  }

  renderCard() {
    this.currentCardData = this.words[this.state.currentWord];
    const template = this.getCardTemplate(this.currentCardData);

    this.currentCardElem = document.createElement('div');
    this.currentCardElem.classList.add('learn-card', 'closed');
    this.currentCardElem.innerHTML = template;
    this.constructor.hideWordInSentences(this.currentCardElem);
    this.root.innerHTML = `
      <div class="learn-word-bar-wrap">
        ${this.getProgressBarTemplate()}
      </div>`;
    this.root.append(this.currentCardElem);

    this.renderWordProgress();
    this.answerInput = document.querySelector('.word-answer-input');
    this.answerInput.focus();
    this.player.updateAudioList(this.state, this.currentCardData);
  }

  getProgressBarTemplate() {
    return `
      <div class='progress-bar-value progress-bar-start'>0</div>
      <div class="learn-word-bar-fill${this.isCardOpened()
        ? ' bar-fill-animate'
        : ''}" style='width: ${this.constructor.getBarWidth(this.state.currentWord, this.state.settings.wordsPerDay)}%'>
        ${this.state.currentWord !== 0
          ? `<div class='progress-bar-fill-value progress-bar-value'>${this.state.currentWord}</div>`
          : ''}
      </div>
      <div class='progress-bar-value progress-bar-end'>${this.state.settings.wordsPerDay}</div>`;
  }

  isCardOpened() {
    return this.currentCardElem && !this.currentCardElem.classList.contains('closed');
  }

  getCardTemplate(cardData) {
    return `
      <div class='answer-indicator'></div>
      <div class='learn-card-header'>
      <div class='card-header-left-col'>
        <ul class='learn-word-progress'>
        </ul>
        <button class='learn-word-sound${this.state.isAudioOn
          ? ''
          : ' learn-sound-off'}'></button>
      </div>
        <ul class='word-groups-btn-list'>
          ${this.state.settings.optional.cardContent.deleteBtn
            ? `<li class='word-groups-btn word-groups-delete' data-group='delete'>
                <span>Delete word</span>
                <span class='word-group-hint'>Delete word</span>
              </li>`
            : ''}
          ${this.state.settings.optional.cardContent.toHardListBtn
            ? `<li class='word-groups-btn word-groups-hard' data-group='hard'>
                <span>Mark word as difficult</span>
                <span class='word-group-hint'>
                  Mark word as difficult
                </span>
                <span class='word-group-added'>
                  Word was marked as difficult
                </span>
              </li>`
            : ''}
        </ul>
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
      
      ${this.state.settings.optional.cardContent.defineLevelOptions
        ? `<ul class='define-level-btn-list'>
            ${constants.WORD_LEVELS
              .map((level) => `<button class='learned-level-btn learned-level-${level}'>${level}</button>`)
              .join('')}
          </ul>`
        : ''}
      <ul class='learn-word-info'>
        <li class='word-content-item learn-translate-wrapper'>
        ${this.state.settings.optional.cardContent.wordTranslate
          ? `<div class='learn-word-translate'>
          ${cardData.wordTranslate}
          </div>`
          : ''}
          ${this.state.settings.optional.cardContent.transcription
            ? `<div class='learn-word-transcription'>
                ${cardData.transcription}
              </div>`
            : ''}
          ${this.state.settings.optional.cardContent.showAnswerBtn
            ? `<button class='words-show-answer-btn'>
                  Show answer
                </button>`
            : ''}
        </li>
          ${this.state.settings.optional.cardContent.textMeaning
          ? `<li class='word-content-item'>
              <div class='word-meaning'>
                ${cardData.textMeaning}
              </div>
              <div class='word-meaning--translate'>
                ${cardData.textMeaningTranslate}
              </div>
            </li>`
          : ''}
          ${this.state.settings.optional.cardContent.wordTranslate
          ? `<li class='word-content-item'>
              <div class='word-example'>
                ${cardData.textExample}
              </div>
              <div class='word-example--translate'>
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

  static getBarWidth(currentAmount, maxAmount) {
    return Math.round((currentAmount / maxAmount) * 100);
  }

  nextCardBtnHandler() {
    if (!this.currentCardElem.classList.contains('closed')) {
      this.onUserDefineWordLevel();
      // this.onUserAnswer(this.currentCardData.id, true);
      this.showNextCard();
      return;
    }

    const userAnswer = this.answerInput.value.toLowerCase();
    const rightAnswer = this.currentCardData.word.toLowerCase();
    const answerResult = this.checkLetters(userAnswer, rightAnswer);

    if (answerResult === 'answerCorrect') {
      this.animateOnCorrectAnswer();
    } else {
      this.animateOnWrongAnswer();
    }
    this.renderWordProgress();
  }

  nextCardKeyHandler(evt) {
    const isCardClosed = () => document.querySelector('.learn-card.closed');
    const isEnterPressed = () => evt.key === 'Enter';

    if (!isEnterPressed()) {
      return;
    }

    if (!isCardClosed()) {
      this.onUserDefineWordLevel();
      // this.onUserAnswer(this.currentCardData.id, true);
      this.showNextCard();
      return;
    }

    this.nextCardBtnHandler();
  }

  renderWordProgress() {
    const progressStepList = document.querySelector('.learn-word-progress');
    progressStepList.innerHTML = `
        ${new Array(this.currentCardData.currentStep).fill()
          .map(() => `<li class='repetitions-times repetitions-times-current'></li>`)
          .join('')}
        ${new Array(constants.REPETITIONS_AMOUNT - this.currentCardData.currentStep).fill()
          .map(() => `<li class='repetitions-times repetitions-times-remained'></li>`)
          .join('')}`;
  }

  animateOnCorrectAnswer(isShowAnswerClicked) {
    if (!isShowAnswerClicked) {
      this.onUserAnswer(this.currentCardData.id, true);
    }
    if (
      !this.state.settings.optional.cardContent.defineLevelOptions
      && !this.state.isAudioOn
    ) {
      this.currentCardElem.querySelector('.answer-indicator').addEventListener('transitionend', () => {
        this.showNextCard();
      }, { once: true });
    }

    this.openCard();
  }

  animateOnWrongAnswer() {
    this.onUserAnswer(this.currentCardData.id, false);
    setTimeout(() => {
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
    }, 1000);
  }

  onUserAnswer() {
    throw new Error('method should be overriden', this);
  }

  onUserDefineWordLevel() {
    throw new Error('method should be overriden', this);
  }

  onUserDeleteWord() {
    throw new Error('method should be overriden', this);
  }

  onMarkWordAsDifficult() {
    throw new Error('method should be overriden', this);
  }

  onShowAnswerBtn() {
    throw new Error('method should be overriden', this);
  }

  onSoundSwitch() {
    throw new Error('method should be overriden', this);
  }

  onCardsOver() {
    this.isCardsOver = true;
  }

  showNextCard() {
    this.player.pause();
    if (this.isCardsOver) {
      alert('cards limit was reached');
      return;
    }
    this.renderCard();
    this.addCardListeners();
  }

  addCardListeners() {
    if (this.state.settings.optional.cardContent.defineLevelOptions) {
      const levelOptionsList = document.querySelector('.define-level-btn-list')
      levelOptionsList.addEventListener('click', ({ target }) => {
        if (!target.classList.contains('learned-level-btn')) {
          return;
        }
        this.onUserDefineWordLevel(target.innerText.toLowerCase());
        this.showNextCard();
      });
    }

    document.querySelector('.word-groups-btn-list').addEventListener('click', ({target}) => {
      if (
        target.closest('.word-groups-hard')
        && !target.closest('.word-groups-hard.marked')
      ) {
        const targetWrap = target.closest('.word-groups-hard');

        this.onMarkWordAsDifficult(this.currentCardData.id);
        targetWrap.addEventListener('animationend', () => {
          targetWrap.classList.remove('disable-hint');
        }, {once:true});
        targetWrap.classList.add('marked', 'disable-hint');
      } else if (target.closest('.word-groups-delete')) {
        this.onUserDeleteWord(this.currentCardData.id);
        this.onUserDefineWordLevel();
        this.currentCardElem.addEventListener('animationend', () => {
          this.showNextCard();
        }, {once:true});
        this.currentCardElem.classList.add('fold-card')
      }
    });

    document.querySelector('.words-show-answer-btn').addEventListener('click', () => {
      this.onShowAnswerBtn(this.currentCardData.id);
      this.answerInput.value = '';
      document.querySelector('.word-answer').classList.remove('faint');
      this.animateOnCorrectAnswer(true);
      this.renderWordProgress();
    });

    document.querySelector('.learn-word-sound').addEventListener('click', ({target}) => {
      if (target.classList.contains('learn-sound-off')) {
        target.classList.remove('learn-sound-off');
        this.player.isAudioOn = true;
        this.onSoundSwitch(true);
      } else {
        target.classList.add('learn-sound-off')
        // target.classList.remove('active');
        this.player.pause();
        this.player.isAudioOn = false;
        this.onSoundSwitch(false);
      }
    });

  }

  openCard() {
    this.currentCardElem.classList.remove('closed');
    this.answerInput.disabled = true;
    const progressBar = document.querySelector('.learn-word-bar-wrap');
    progressBar.innerHTML = this.getProgressBarTemplate();
    this.player.playCurrent();
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