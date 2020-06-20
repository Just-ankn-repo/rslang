import {constants} from './constants';

export default class SavannahModel {
  constructor(exampleData) {
    this.data = this.constructor.shuffleWords(exampleData);
    this.state = this.constructor.getDefaultState();
    this.questions = this.getQuestionsList(this.data);
  }

  static shuffleWords(exampleData) {
    return exampleData.sort(() => Math.random() - 0.5);
  }

  static getDefaultState() {
    const state = {
      // lives: LIVES_AMOUNT,
      lives: 1,
      currentQuestion: 0,
      level: constants.LEVELS[0],
      points: 0,
    };

    return state;
  }

  updateQuestionsList(wordsList) {
    const shuffledWords = this.constructor.shuffleWords(wordsList);
    this.questions = this.getQuestionsList(shuffledWords); 
  }

  updateState(isCorrect) {
    if (!isCorrect) {
      this.updateLives();
    } else {
      this.updateScore();
    }
    this.updateQuestionIndex();
    const isLevelChanged = this.updateLevel();
    return isLevelChanged;
  }

  updateLives() {
    this.state.lives -= 1;

    if (!this.state.lives) {
      this.endGame(false)
    }
  }

  updateQuestionIndex() {
    this.state.currentQuestion += 1;
  }

  updateLevel() {
    if (this.state.currentQuestion < constants.QUESTIONS_AMOUNT) {
      return false;
    }
    if (this.state.level === constants.LEVELS[constants.LEVELS.length - 1]) {
      this.endGame(true);
      return false;
    }
    const levelIndex = constants.LEVELS.findIndex((level) => level === this.state.level);
    this.state.level = constants.LEVELS[levelIndex + 1];
    this.state.currentQuestion = 0;
    return true;
  }

  updateScore() {
    this.state.points += constants.POINTS[this.state.level];
  }

  endGame(isWin) {
    this.isGameEnded = {
      isWin,
    };
  }

  getQuestionsList(data) {
    const words = [];

    for (let i = 0; i < constants.QUESTIONS_AMOUNT; i += 1) {
      const word = {
        word: data[i].word,
        answer: data[i].wordTranslate,
        options: this.getAnswerOptions(data[i]),
        image: data[i].image,
        audio: data[i].audio,
        group: data[i].group,
        transcr: data[i].transcription,
      };

      words.push(word);
    }

    return words;
  }

  getAnswerOptions(correctAnswer) {
    let wrongAnswersList = this.constructor.getWrongAnswersList(this.data, correctAnswer);

    wrongAnswersList = this.getQuestionOptions(wrongAnswersList);
    const optionsList = this.addAnswerToOptions(wrongAnswersList, correctAnswer);

    return optionsList;
  }

  static getRandomNumber(min, max) {
    const rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  }

  static getWrongAnswersList(data, correctAnswer) {
    const answerIndex = data.findIndex((item) => item.id === correctAnswer.id);
    const words = data.map((wordDataItem) => wordDataItem.wordTranslate);
    words.splice(answerIndex, 1);
    return words;
  }

  getQuestionOptions(optionsList) {
    const randomOptions = new Array(constants.ANSWERS_OPTIONS_AMOUNT - 1).fill('')
      .map(() => {
        const randomOptionsIndex = this.constructor.getRandomNumber(0, optionsList.length - 1);
        return optionsList[randomOptionsIndex];
      });

    return randomOptions;
  }

  addAnswerToOptions(options, correctAnswer) {
    const randomPosition = this.constructor.getRandomNumber(0, constants.ANSWERS_OPTIONS_AMOUNT - 1);

    options.splice(randomPosition, 0, correctAnswer.wordTranslate);
    return options;
  }
}