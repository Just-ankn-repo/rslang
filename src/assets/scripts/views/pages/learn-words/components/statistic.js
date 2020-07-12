// Set complete
// Cards complete: 50
// Correct rate: 0 %
//   New words: 33
// Longest streak: 2
// 1 of 4 completed
// The 50 - card set you completed today is the start of the Lingvist magic.Complete a set on 3 more days this week to really start feeling the difference!

// Continue
// import constants from './constants';

export default class Statistic {
  constructor(wordsList, settings) {
    this.wordsAmount = Math.min(wordsList.length, settings.wordsPerDay);
    this.newWordsAmount = settings.optional.newWordsPerDay;
    this.correctAnswersAmount = 0;
    this.longestStreak = 0;
    this.correctStreak = 0;
  }

  render() {
    const template = `
      <div class='cards-statistic-container'>
        <h1 class='cards-statistic-title'>
          Set complete!
        </h1>
        <ul class='cards-statistic-specs'>
          <li class='statistic-specs-item'>
            <span class='specs-item-name'>Cards complete:</span>
            <span class='specs-item-value'>${this.wordsAmount}</span>
          </li>
          <li class='statistic-specs-item'>
            <span class='specs-item-name'>Correct rate:</span>
            <span class='specs-item-value'>${this.getCorrectRate()} %</span>
          </li>
          <li class='statistic-specs-item'>
            <span class='specs-item-name'>New words:</span>
            <span class='specs-item-value'>${this.newWordsAmount}</span>
          </li>
          <li class='statistic-specs-item'>
            <span class='specs-item-name'>Longest streak:</span>
            <span class='specs-item-value'>${this.longestStreak}</span>
          </li>
        </ul>
      </div>
      <p class='cards-statistic-instruction'>
          That's all for today. Daily card limit has been reached.
          You can increase the limit in the settings, but keep in mind that the more new cards you see, the more you will need to repeat in the near future
      </p>`;

    document.querySelector('.learn-words-container').innerHTML = template;
  }

  increaseCorrectAnswersCounter() {
    this.correctAnswersAmount += 1;
    this.correctStreak += 1;
    this.longestStreak = Math.max(this.longestStreak, this.correctStreak);
  }

  resetCorrectStreak() {
    this.correctStreak = 0;
  }

  getCorrectRate() {
    return Math.round((this.correctAnswersAmount / this.wordsAmount) * 100);
  }
}