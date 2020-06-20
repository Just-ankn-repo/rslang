import { constants, getLevelFromGroup } from './constants';

class Statistic {
  constructor() {
    this.userWords = {
      correctAnswered: [],
      wrongAnswered: [],
    }
  }

  render(gameResult, state) {
    this.root = document.querySelector('.container');
    const { points, lives } = state;
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
              <span class="bar-fill" style="width: ${this.constructor.getBarWidth(points, constants.MAX_POINTS)}%;">
              </span>
            </div>
          </li>
          <li class='result result-wrong'>
            <span>Wrong answers: </span>
            <b>${this.userWords.wrongAnswered.length}</b>
            <div class="bar-wrap fail">
              <span class="bar-fill" style="width: ${this.constructor.getBarWidth(this.userWords.wrongAnswered.length, constants.ANSWERS_AMOUNT)}%;">
              </span>
            </div>
          </li>
          <li class='result result-correct'>
            <span>Correct answers: </span>
            <b>${this.userWords.correctAnswered.length}</b>
            <div class="bar-wrap success">
              <span class="bar-fill" style="width: ${this.constructor.getBarWidth(this.userWords.correctAnswered.length, constants.ANSWERS_AMOUNT)}%;">
              </span>
            </div>
          </li>
        </ul>
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
                      <i class="fa fa-circle ${getLevelFromGroup(word.group)} level-tag"> ${word.answer}</i>
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
                      <i class="fa fa-circle ${getLevelFromGroup(word.group)} level-tag"> ${word.answer}</i>
                    </div>
                  </div>
                </li>`)
              .join('')}
          </ul>
        </div>
      </section>`;

    this.root.innerHTML = getStatisticTemplate();
  }

  static getBarWidth(value, max) {
    return Math.round((value / max) * 100);
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