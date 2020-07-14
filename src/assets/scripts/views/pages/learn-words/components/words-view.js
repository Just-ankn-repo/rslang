import constants from './constants';
import Player from './player';
import SettingsPopup from './settings-popup';

export default class WordsView {
  constructor(words, state) {
    this.words = words;
    this.state = state;
    this.root = null;
    this.currentCardData = null;
    this.currentCardElem = null;
    this.player = new Player(this.state.isAudioOn);
    this.settingsPopup = new SettingsPopup(this.state.settings);
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
  }

  renderCard(onUpdate, isOpened) {
    this.currentCardData = onUpdate && isOpened
      ? this.words[this.state.currentWord - 1]
      : this.words[this.state.currentWord];

    if (!onUpdate && !isOpened) {
      this.isFirstAttempt = true;
    }

    const template = this.getCardTemplate(this.currentCardData);

    this.currentCardElem = document.createElement('div');
    this.currentCardElem.classList.add('learn-card', 'closed');
    this.currentCardElem.innerHTML = template;

    if (onUpdate && isOpened) {
      this.currentCardElem.classList.remove('closed');
      this.currentCardElem.querySelector('.word-answer-input').disabled = true;
    } else if (onUpdate && !isOpened) {
      const prevValue = this.answerInput.value;

      this.currentCardElem.querySelector('.word-answer-input').value = prevValue;
    }

    this.constructor.hideWordInSentences(this.currentCardElem);
    this.root.innerHTML = `
      <div class="learn-word-bar-wrap">
        ${this.getProgressBarTemplate(true)}
      </div>`;
    this.root.append(this.currentCardElem);

    this.renderWordProgress();
    this.answerInput = document.querySelector('.word-answer-input');
    this.answerInput.focus();
    this.player.updateAudioList(this.state, this.currentCardData);
    this.settingsPopup.init(this.state.settings.optional.cardContent);
  }

  getProgressBarTemplate(withoutAnimate) {
    return `
      <div class='progress-bar-value progress-bar-start'>0</div>
      <div class="learn-word-bar-fill${this.isCardOpened() && !withoutAnimate
        ? ' bar-fill-animate'
        : ''}" style='width: ${this.constructor.getBarWidth(this.state.currentWord, Math.min(this.state.settings.wordsPerDay, this.words.length))}%'>
        ${this.state.currentWord !== 0
          ? `<div class='progress-bar-fill-value progress-bar-value'>${this.state.currentWord}</div>`
          : ''}
      </div>
      <div class='progress-bar-value progress-bar-end'>${Math.min(this.state.settings.wordsPerDay, this.words.length)}</div>`;
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
                <span class='word-group-hint'>Delete word</span>
              </li>`
            : ''}
          ${this.state.settings.optional.cardContent.toHardListBtn
            ? `<li class='word-groups-btn word-groups-hard' data-group='hard'>
                <span class='word-group-hint'>
                  Mark word as difficult
                </span>
                <span class='word-group-added'>
                  Word was marked as difficult
                </span>
              </li>`
            : ''}
          <li class='word-groups-btn word-groups-settings' data-group='settings'>
            <span class='word-group-hint'>Settings</span>
          </li>
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
          ${this.state.settings.optional.cardContent.textExample
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
      this.showNextCard();
      return;
    }

    const userAnswer = this.answerInput.value.toLowerCase();
    const rightAnswer = this.currentCardData.word.toLowerCase();
    const answerResult = this.checkLetters(userAnswer, rightAnswer);

    if (answerResult === 'answerCorrect') {
      this.animateOnCorrectAnswer();
    } else {
      this.isFirstAttempt = false;
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
      this.onUserAnswer(this.currentCardData.id, true, this.isFirstAttempt);
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
    this.showAgain(this.state.currentWord);
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

  onCardsSetCompleted() {
    throw new Error('method should be overriden', this);
  }

  onCardsOver() {
    this.isCardsOver = true;
  }

  showNextCard() {
    this.player.pause();

    if (this.isCardsOver) {
      this.onCardsSetCompleted();
      return;
    }

    this.renderCard();
    this.addCardListeners();
  }

  updateCurrentCard() {
    const isOpened = !this.currentCardElem.classList.contains('closed');

    this.renderCard(true, isOpened);
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
        this.showAgain(this.state.currentWord - 1);
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

    const showAnswerBtn = document.querySelector('.words-show-answer-btn');

    if (showAnswerBtn) {
      showAnswerBtn.addEventListener('click', () => {
        this.onShowAnswerBtn(this.currentCardData.id);
        this.answerInput.value = '';
        document.querySelector('.word-answer').classList.remove('faint');
        this.animateOnCorrectAnswer(true);
        this.renderWordProgress();
      });
    }

    document.querySelector('.learn-word-sound').addEventListener('click', ({target}) => {
      if (target.classList.contains('learn-sound-off')) {
        target.classList.remove('learn-sound-off');
        this.player.isAudioOn = true;
        this.onSoundSwitch(true);
      } else {
        target.classList.add('learn-sound-off');
        this.player.pause();
        this.player.isAudioOn = false;
        this.onSoundSwitch(false);
      }
    });

    document.querySelector('.word-groups-settings').addEventListener('click', ({target}) => {
      this.settingsPopup.show(target);
    });
  }

  openCard() {
    this.currentCardElem.classList.remove('closed');
    this.answerInput.disabled = true;
    const progressBar = document.querySelector('.learn-word-bar-wrap');

    progressBar.innerHTML = this.getProgressBarTemplate();
    this.player.playCurrent();
  }

  showAgain(currentIndex) {
    const lastIndex = Math.min(this.words.length, this.state.settings.wordsPerDay) - 1;

    if (
      currentIndex === lastIndex
      || this.words.includes(this.currentCardData, currentIndex + 1)
      ) {
      return;
    }

    const newIndex = this.constructor.getRandomNumber(currentIndex + 1, lastIndex);

    this.words.splice(newIndex, 0, this.currentCardData);
  }

  static getRandomNumber(min, max) {
    const rand = min + Math.random() * (max + 1 - min);

    return Math.floor(rand);
  }

  checkLetters(userAnswer, rightAnswer) {
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
    return solvedLetterIndexList;
  }
}