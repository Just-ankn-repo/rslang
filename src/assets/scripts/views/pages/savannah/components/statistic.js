import constants from './constants';

class Statistic {
  constructor() {
    this.userWords = {
      correctAnswered: [],
      wrongAnswered: [],
    }
  }

  init(gameResult, state) {
    this.render(gameResult, state);
    this.addListeners();
  }

  resetRoundStat() {
    this.userWords.correctAnswered = [];
    this.userWords.wrongAnswered = [];
  }

  addListeners() {
    const nextRoundBtn = document.querySelector('.next-round-btn');

    nextRoundBtn.addEventListener('click', this.toNextRound.bind(this));
  }

  toNextRound() {
    throw new Error('method should be overriden', this);
  }

  render(gameResult, state) {
    this.root = document.querySelector('.container');
    const maxPoints = this.constructor.getMaxPoints();
    const { points } = state;
    const getStatisticTemplate = () => `
      <section class='statistic ${gameResult ? 'success' : 'fail'}'>
        <h2 class='statistic-title'>
          Your results:
        </h2>
        <ul class='results-list'>
          <li class='result result-points'>
            <span>Score: </span>
            <b>${points}</b>
            <div class="bar-wrap ${gameResult ? 'success' : 'fail'}">
              <span class="bar-fill" style="width: ${this.constructor.getBarWidth(points, maxPoints)}%;">
              </span>
            </div>
          </li>
          <li class='result result-wrong'>
            <span>Wrong answers: </span>
            <b>${this.userWords.wrongAnswered.length}</b>
            <div class="bar-wrap fail">
              <span class="bar-fill" style="width: ${this.constructor.getBarWidth(this.userWords.wrongAnswered.length, constants.QUESTIONS_AMOUNT)}%;">
              </span>
            </div>
          </li>
          <li class='result result-correct'>
            <span>Correct answers: </span>
            <b>${this.userWords.correctAnswered.length}</b>
            <div class="bar-wrap success">
              <span class="bar-fill" style="width: ${this.constructor.getBarWidth(this.userWords.correctAnswered.length, constants.QUESTIONS_AMOUNT)}%;">
              </span>
            </div>
          </li>
        </ul>
        <div class='stat-results-wrap'>
          <div class='words-result'>
            <h3 class='stat-word-title'>
              ${this.userWords.wrongAnswered.length
                ? 'Words to learn'
                : ''}
            </h3>
            <ul class='words-list-result words-to-learn'>
              ${this.userWords.wrongAnswered
                .map((word) => `
                  <li class='word-info'>
                    <img class='word-img' src="${constants.DATA_URL}${word.image}" />
                    <div class="statistic-translate">
                      <div class="word-name">
                        <span>${word.word}</span>
                        <span class='stat-transcr'>${word.transcr}</span>
                      </div>
                      <div class="stat-level">
                        <span class="${word.levelSpeed} level-tag"> ${word.answer}</i>
                      </div>
                    </div>
                  </li>`)
                .join('')}
            </ul>
            <h3 class='stat-word-title'>
              ${this.userWords.correctAnswered.length
                ? 'Words you have learned'
                : ''}
            </h3>
            <ul class='words-list-result words-learned'>
              ${this.userWords.correctAnswered
                .map((word) => `
                  <li class='word-info'>
                    <img class='word-img' src="${constants.DATA_URL}${word.image}" />
                    <div class="statistic-translate">
                      <div class="word-name">
                        <span>${word.word}</span>
                        <span class='stat-transcr'>${word.transcr}</span>
                      </div>
                      <div class="stat-level">
                        <i class="fa fa-circle ${word.levelSpeed} level-tag"> ${word.answer}</i>
                      </div>
                    </div>
                  </li>`)
                .join('')}
            </ul>
          </div>
          <button class='next-round-btn btn'>
            Next round <i class='fa fa-long-arrow-right'></i>
          </button>
        </div>
      </section>`;

    this.root.innerHTML = getStatisticTemplate();
  }

  static getBarWidth(value, max) {
    return Math.round((value / max) * 100);
  }

  static getMaxPoints() {
    return Object.values(constants.POINTS)
      .reduce((acc, item, index) => {
        const wordsPerLevel = Math.ceil(constants.QUESTIONS_AMOUNT / constants.LEVELS.length);
        const rate = index >= constants.LEVELS.length - 1
          ? constants.QUESTIONS_AMOUNT % (wordsPerLevel * (index))
          : wordsPerLevel;

        return acc + (item * rate);
      }, 0);
  }

  saveQuestion(isCorrect, questionWord) {
    if (isCorrect) {
      this.userWords.correctAnswered.push(questionWord);
    } else {
      this.userWords.wrongAnswered.push(questionWord);
    }
  }
}

const statistic = new Statistic();

export default statistic;