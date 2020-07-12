import constants from './constants';

export default class SavannahView {
  constructor(questionsList, state) {
    this.questionsList = questionsList;
    this.state = state;
    this.root = document.querySelector('.container');
    this.prevLevel = '';
    this.isMuted = false;
    this.onKeyAnswer = this.onKeyAnswer.bind(this);
    this.init();
  }

  init() {
    this.addListeners();
  }

  addListeners() {
    const startGameBtn = document.querySelector('.start-game-btn');

    startGameBtn.addEventListener('click', this.startGame.bind(this));
  }

  startGame() {
    this.root.innerHTML = '';
    const timerElem = this.constructor.getTimerTemplate();

    this.root.append(timerElem);
    this.startTimer(timerElem);
  }

  startTimer(timerElem) {
    const time = timerElem.querySelector('.timer');
    const setTimerTimeout = () => {
      setTimeout(() => {
        let restTime = +time.innerText;

        if (restTime === 0) {
          this.startQuestion();
          return;
        }

        restTime -= 1;
        time.innerText = restTime;
        setTimerTimeout();
      }, constants.SECOND);
    };

    setTimerTimeout();
  }

  static getTimerTemplate() {
    const timerElem = document.createElement('div');

    timerElem.classList.add('start-timer');
    timerElem.innerHTML = `
      <div class='timer'>${constants.START_TIME}</div>
      <div class='timer-spinner'></div>
      <p class='keys-tip'>
        Use 1, 2, 3, 4 keys to give quick answers
      </p>`
    return timerElem;
  }

  changeQuestion(state, questionsList) {
    if (questionsList) {
      this.questionsList = questionsList;
    }

    this.state = state;
    this.startQuestion();
  }

  startQuestion() {
    this.root.innerHTML = '';
    this.renderScore();
    this.settingsChanged = false;
    this.prevLevel = this.state.level;
    this.renderQuestion();
    this.player = document.querySelector('.player');

    if (!this.isMuted) {
      this.player.play();
    }

    this.addQuestionListener();
  }

  renderScore() {
    const { lives, currentQuestion: quesionIndex, level, points, round, langLevel} = this.state;
    const scoreElem = document.createElement('section');

    scoreElem.classList.add('score');
    scoreElem.innerHTML = `
      <div class='points-wrap'>
        <span>Score </span>
        <span class='points'>
          +${points}
        </span>
      </div>
      <div class='settings-btn-wrap'>
        <button class='btn level-settings-btn'>Settings <i class="fa fa-caret-down" aria-hidden="true"></i></button>
        <div class='settings-popup'>
          <form class='settings-form' action='#' method='get'>
            <h5 class='settings-title'>
              Choose level
            </h5>
            <ul class='lang-level-radio-list'>
              ${constants.LANG_LEVEL
        .map((levelName, index) => {
          return `
                    <li class='settings-lang-level-item'>
                      <input type="radio" id='level-${constants.LANG_LEVEL[index]}' class="radio-lang-level" name="langLevel" value='${index}'${langLevel === index ? ' checked' : ''}/>
                      <label class='level-label-wrap' for="level-${constants.LANG_LEVEL[index]}">
                        <span class='lang-level-label'></span>
                        <span class='lang-level-shorthand'>
                          ${constants.LANG_LEVELS_SHORTHANDS[index]}
                        </span>
                        <span class='lang-level-name'>${levelName}</span>
                      </label>
                    </li>`;
        }).join('')}
            </ul>
            <h5 class='settings-title'>
              Choose round
            </h5>
            <span class='settings-tip'>Enter the number between 1 and ${constants.ROUNDS_AMOUNT}</span>
            <input class='round-input' type='number' min='1' max='30' name='round' required placeholder='1...${constants.ROUNDS_AMOUNT}'>
            <div class='settings-popup-btn-wrap'>
              <button type='submit' class='btn save-settings-btn'>Save</button>
              <button type='button' class='btn cancel-settings-btn'>Cancel</button>
            </div>
          </form>
        </div>
      </div>
      <div class='round-wrap${this.settingsChanged ? ' animate__flipInX' : ''}'>Round:<span class='round-number'>${round + 1}</span> / ${constants.ROUNDS_AMOUNT}</div>
      <div class='lang-level${this.settingsChanged ? ' animate__flipInX' : ''}' title='${constants.LANG_LEVEL[langLevel]}'>
        Level: <span class='lang-level-value'>${constants.LANG_LEVELS_SHORTHANDS[langLevel]}</span>
      </div>
      <div class='${this.prevLevel !== this.state.level ? 'animate__flip' : ''} level-title-wrap ${level}'>
        <i class="fa fa-circle ${level} level-title level-tag">
          ${level}
        </i>
      </div>
      <button class='btn mute-mode-btn${this.isMuted ? ' sound-off' : ''}'></button>
      <div class='lives'>
        ${new Array(constants.LIVES_AMOUNT - lives).fill()
          .map(() => `<div class='live live-empty'></div>`)
          .join('')}
        ${new Array(lives).fill()
        .map(() => `<div class='live'></div>`)
        .join('')}
      </div>`;

    this.root.append(scoreElem);
  }

  renderQuestion() {
    const { currentQuestion: quesionIndex, level } = this.state;

    this.currentQuestion = this.questionsList[quesionIndex];
    const questionWrap = document.createElement('div');

    questionWrap.classList.add('question-wrap');
    questionWrap.innerHTML = `
      <div class='question-word question-pulse-animated'>${this.currentQuestion.word}</div>
      <ul class='options'>
        ${this.currentQuestion.options.map((option, index) => {
          return option === this.currentQuestion.answer
            ? `<li class='option' data-is-answer='true'>
                  <span class='option-number'>${index + 1}</span>
                  ${option}
                </li>`
            : `<li class='option'>
                  <span class='option-number'>${index + 1}</span>
                  ${option}
                </li>`;
        }).join('')}
      </ul>
      <div class='question-timeout'>
      </div>
      <audio class='player' src='${constants.DATA_URL}${this.currentQuestion.audio}'>
      </audio>`;

    this.root.append(questionWrap);
    const questionWord = document.querySelector('.question-word');

    questionWord.style.transform = `translate(-50%, -${questionWrap.offsetHeight + questionWord.offsetHeight}px`;
    questionWord.addEventListener('animationend', () => {
      if (
        questionWord.classList.contains('time-end')
        || questionWord.classList.contains('correct-answer')
        ) {
          return;
        }

        questionWord.style.animationDuration = '';
        this.animateOnWrongAnswer();
    }, {once: true});
    
    questionWord.style.animationDuration = `${constants.QUESTION_SPEED[level]}s`;
    const forcedReflow = () => questionWord.offsetHeight;

    forcedReflow();

    questionWord.classList.add('pending');
  }

  addQuestionListener() {
    const optionsList = document.querySelector('.options');
    const questionWord = document.querySelector('.question-word');
    const levelSettingsBtn = document.querySelector('.level-settings-btn');
    const settingsForm = document.querySelector('.settings-form');
    const muteBtn = document.querySelector('.mute-mode-btn');

    muteBtn.addEventListener('click', () => {
      muteBtn.classList.toggle('sound-off');
      this.isMuted = !this.isMuted;
    });

    levelSettingsBtn.addEventListener('click', () => {
      questionWord.style.animationPlayState = 'paused';
      this.showSettings();
    });

    this.addKeyListeners();

    settingsForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      const formData = Object.fromEntries([...new FormData(settingsForm)]);
      const newLevel = Number(formData.langLevel);
      const newRound = Number(formData.round);

      if (
        newLevel === this.state.langLevel 
        && newRound === this.state.round + 1
      ) {
        this.constructor.hideSettings();
      } else {
        document.body.removeEventListener('mouseup', this.constructor.hideSettings);
        this.onSettingsChange(newLevel, newRound - 1);
        this.settingsChanged = true;
      }
    });

    this.isCorrect = false;

    questionWord.addEventListener('animationend', (evt) => {
      if (evt.animationName === 'wordDown') {
        return;
      }

      this.onUserAnswer(this.isCorrect, this.currentQuestion);
    });

    optionsList.addEventListener('click', (evt) => {
      if (!evt.target.classList.contains('option')) {
        return;
      }

      this.isCorrect = this.constructor.isAnswerCorrect(evt.target);

      this.userAnswerHandler(evt.target, this.isCorrect);
    });
  }

  userAnswerHandler(answerElement, isCorrect) {
    const questionWord = document.querySelector('.question-word');

    questionWord.style.animationDuration = '';

    if (isCorrect) {
      this.animateOnCorrectAnswer(answerElement);
    } else {
      this.animateOnWrongAnswer(answerElement);
    }
  }

  onUserAnswer() {
    throw new Error('method should be overriden', this);
  }

  onSettingsChange() {
    throw new Error('method should be overriden', this);
  }

  static isAnswerCorrect(answer) {
    return answer.dataset.isAnswer;
  }

  animateOnWrongAnswer(answerElem) {
    this.player.src ='./audio/wrong.mp3';

    if (!this.isMuted) {
      this.player.play();
    }

    const questionWord = document.querySelector('.question-word');
    const questionWrap = document.querySelector('.question-wrap');

    questionWord.classList.remove('question-pulse-animated');
    const errorWarning = document.createElement('div');

    errorWarning.classList.add('error-warning');
    errorWarning.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" class="error">
        <circle class="solid" fill="none" stroke-linecap="round" stroke-width="4" stroke-miterlimit="10" cx="32" cy="32" r="30"/>
        <circle class="animation" fill="none" stroke-linecap="round" stroke-width="4" stroke-miterlimit="10" cx="32" cy="32" r="30"/>
        <line class="left" fill="none" stroke="#000000" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" x1="19.271" y1="19.521" x2="44.729" y2="44.979"/>
        <line class="right" fill="none" stroke="#000000" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" x1="44.729" y1="19.521" x2="19.271" y2="44.979"/>
      </svg>`;
    setTimeout(() => {
      errorWarning.querySelector('.error').classList.add('toggle');
    }, 0);

    questionWrap.prepend(errorWarning);
    questionWord.classList.add('time-end');
    this.hughlightOptions(answerElem);

    if (answerElem) {
      answerElem.classList.add('answer-error', 'disabled');
    }
  }

  animateOnCorrectAnswer(answer) {
    this.player.src = './audio/correct.mp3';

    if (!this.isMuted) {
      this.player.play();
    }

    const questionWord = document.querySelector('.question-word');

    questionWord.classList.remove('question-pulse-animated');
    questionWord.classList.add('correct-answer');
    this.hughlightOptions(answer);
    questionWord.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" class="success">
        <circle class="solid" fill="none" stroke-linecap="round" stroke-width="4" stroke-miterlimit="10" cx="32" cy="32" r="30"/>
        <circle class="animation" fill="none" stroke-linecap="round" stroke-width="4" stroke-miterlimit="10" cx="32" cy="32" r="30"/>
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="6" fill="none" stroke="#000" d="M47.91 23.39L26.7 44.61 16.09 34"/>
      </svg>`
    setTimeout(() => {
      questionWord.querySelector('.success').classList.add('toggle');
    }, 0);
  }

  addKeyListeners() {
    document.body.addEventListener('keydown', this.onKeyAnswer, {once: true});
  }

  onKeyAnswer(evt) {
    const popup = document.querySelector('.settings-popup');
    const answerIndex = +evt.key;

    if (!constants.KEY_ANSWERS.includes(answerIndex)) {
      return;
    }

    const targetOption = [...document.querySelectorAll('.option')][answerIndex - 1];

    if (!targetOption || popup.classList.contains('active')) {
      return;
    }

    this.isCorrect = this.constructor.isAnswerCorrect(targetOption);

    this.userAnswerHandler(targetOption, this.isCorrect);
  }

  hughlightOptions() {
    const optionsList = document.querySelectorAll('.option');

    [...optionsList].forEach((option) => {
      if (this.constructor.isAnswerCorrect(option)) {
        option.classList.add('answer-correct', 'disabled');
      } else {
        option.classList.add('answer-option', 'disabled');
      }
    });
  }

  showSettings() {
    const settingsPopup = document.querySelector('.settings-popup');

    if (settingsPopup.classList.contains('active')) {
      settingsPopup.classList.remove('active');
      document.querySelector('.question-word').style.animationPlayState = '';
      document.body.removeEventListener('mouseup', this.constructor.hideSettings);
      return;
    }

    settingsPopup.classList.add('active');
    document.body.addEventListener('mouseup', this.constructor.hideSettings);
  }

  static hideSettings(evt) {
    let target;

    if (evt) {
      target = evt.target;
    }

    if (
      (target && target.closest('.settings-popup')
      && !target.classList.contains('cancel-settings-btn'))
      || target && target.closest('.level-settings-btn')
    ) {
      return;
    }

    const settingsPopup = document.querySelector('.settings-popup');

    if (!settingsPopup) {
      return;
    }

    settingsPopup.classList.remove('active');
    document.querySelector('.question-word').style.animationPlayState = '';
    document.body.removeEventListener('mouseup', this.constructor.hideSettings);
  }
}