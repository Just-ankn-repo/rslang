const START_TIME = 1;
const SECOND = 1000;
const LIVES_LIMIT = 5;
const QUESTION_SPEED = {
  slow: 14,
  moderate: 10,
  fast: 7,
}

export default class SavannahView {
  constructor(questionsList, state) {
    this.questionsList = questionsList;
    this.state = state;
    this.root = document.querySelector('.container');
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
        let restTime = +timerElem.innerText;
        if (restTime === 0) {
          this.startQuestion();
        }
        restTime -= 1;
        time.innerText = restTime;
        setTimerTimeout();
      }, SECOND);
    };

    setTimerTimeout();
  }

  static getTimerTemplate() {
    const timerElem = document.createElement('div');
    timerElem.classList.add('start-timer');
    timerElem.innerHTML = `
      <div class='timer'>${START_TIME}</div>
      <div class='timer-spinner'></div>`;
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
    this.renderQuestion();
    this.addQuestionListener();
  }

  renderScore() {
    const { lives, currentQuestion: quesionIndex, level, points} = this.state;
    const scoreElem = document.createElement('section');

    scoreElem.classList.add('score');
    scoreElem.innerHTML = `
      <div class='points'><span>Score </span><span class='points'>${points}</span></div>
      <div class='level'>${level}</div>
      <div class='lives'>
        ${new Array(LIVES_LIMIT - lives).fill()
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
      <div class='question-word'>${this.currentQuestion.word}</div>
      <ul class='options'>
        ${this.currentQuestion.options.map((option) => {
          return option === this.currentQuestion.answer
            ? `<li class='option' data-is-answer='true'>${option}</li>`
            : `<li class='option'>${option}</li>`;
        }).join('')}
      </ul>
      <div class='deadlock-wrap'>
        <div class="cssload-bell">
          <div class="cssload-circle">
            <div class="cssload-inner"></div>
          </div>
          <div class="cssload-circle">
            <div class="cssload-inner"></div>
          </div>
          <div class="cssload-circle">
            <div class="cssload-inner"></div>
          </div>
          <div class="cssload-circle">
            <div class="cssload-inner"></div>
          </div>
          <div class="cssload-circle">
            <div class="cssload-inner"></div>
          </div>
        </div>
      </div>`;
    this.root.append(questionWrap);
    const questionWord = document.querySelector('.question-word');
    // questionWord.addEventListener('animationend', () => {
    //   this.onUserAnswer(false);
    // }, { once: true });
    questionWord.addEventListener('transitionend', () => {
      if (
        questionWord.classList.contains('time-end')
        || questionWord.classList.contains('correct-answer')
        ) {
          return;
        }
        
        this.animateOnWrongAnswer();
    }, {once: true});
    
    questionWord.style.transition = `transform ${QUESTION_SPEED[level]}s linear 0s`;

    const forcedReflow = () => questionWord.offsetHeight;
    forcedReflow();

    questionWord.classList.add('pending');
  }

  addQuestionListener() {
    const optionsList = document.querySelector('.options');
    const questionWord = document.querySelector('.question-word');
    let isCorrect = false;
    questionWord.addEventListener('animationend', () => {
      this.onUserAnswer(isCorrect);
    }, { once: true });

    optionsList.addEventListener('click', (evt) => {
      if (!evt.target.classList.contains('option')) {
        return;
      }
      isCorrect = this.constructor.isAnswerCorrect(evt.target);

      if (isCorrect) {
        this.animateOnCorrectAnswer(evt.target);
      } else {
        this.animateOnWrongAnswer(evt.target);
      }

      // this.onUserAnswer(isCorrect);
    });
  }

  onUserAnswer() {
    throw new Error('method should be overriden', this);
  }

  static isAnswerCorrect(answer) {
    return answer.dataset.isAnswer;
  }

  animateOnWrongAnswer(answerElem) {
    const questionWord = document.querySelector('.question-word');
    questionWord.classList.add('time-end');
    this.hughlightOptions(answerElem);
    if (answerElem) {
      answerElem.classList.add('answer-error', 'disabled');
    }
  }

  animateOnCorrectAnswer(answer) {
    const questionWord = document.querySelector('.question-word');
    questionWord.classList.add('correct-answer');
    this.hughlightOptions(answer);
    questionWord.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" class="success">
          <circle class="solid" fill="none" stroke-linecap="round" stroke-width="4" stroke-miterlimit="10" cx="32" cy="32"
              r="30"></circle>
          <circle class="animation" fill="none" stroke-linecap="round" stroke-width="4" stroke-miterlimit="10" cx="32" cy="32"
              r="30"></circle>
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="6" fill="none" stroke="#000"
              d="M47.91 23.39L26.7 44.61 16.09 34"></path>
      </svg>`;
    setTimeout(() => {
      questionWord.querySelector('.success').classList.add('toggle');
    }, 0);
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
}