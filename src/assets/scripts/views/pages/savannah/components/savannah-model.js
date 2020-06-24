import constants from './constants';
import { getRandomNumber, shuffleWords } from '../../../../utils/utils';

export default class SavannahModel {
  constructor(roundWords) {
    this.roundWordsList = shuffleWords(roundWords);
    this.state = this.constructor.getDefaultState();
    this.roundQuestions = this.getQuestionsList(this.roundWordsList);
  }

  // static shuffleWords(words) {
  //   return words.sort(() => Math.random() - 0.5);
  // }

  static getDefaultState(langLevel = constants.DEFAULT_LEVEL, round = constants.DEFAULT_ROUND) {
    const state = {
      lives: constants.LIVES_AMOUNT,
      currentQuestion: 0,
      level: constants.LEVELS[0],
      points: 0,
      langLevel,
      round,
      isGameEnded: false,
    };

    return state;
  }

  updateQuestionsList(wordsList) {
    this.roundWordsList = shuffleWords(wordsList);
    this.roundQuestions = this.getQuestionsList(this.roundWordsList); 
  }

  updateRound() {
    // if (newRound) {
    //   this.state.round = newRound;
    //   this.resetRoundState();

    //   return;
    // }
    if (this.state.round >= constants.ROUNDS_AMOUNT - 1) {
      this.updateLangLevel();
    } else {
      this.state.round += 1;
    }

    this.resetRoundState();
  }

  resetRoundState() {
    const newRoundState = {
      ...this.constructor.getDefaultState(),
      round: this.state.round,
      langLevel: this.state.langLevel,
    };

    this.state = newRoundState;
  }

  updateLangLevel() {
    // if (newLevel) {
    //   this.state.langLevel = newLevel;
    //   return;
    // }

    if (this.state.langLevel < constants.LANG_LEVEL.length - 1) {
      this.state.langLevel += 1;
    }

    this.state.round = 0;
  }

  updateLevelSettings(newLevel, newRound) {
    this.state.langLevel = newLevel;
    this.state.round = newRound;
    this.resetRoundState();
  }

  updateState(isCorrect) {
    if (!isCorrect) {
      this.updateLives();
    } else {
      this.updateScore();
    }

    this.updateQuestionIndex();
    this.updateSpeedLevel();
    this.endIfLastQuestion();
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

  endIfLastQuestion() {
    if (this.state.currentQuestion >= constants.QUESTIONS_AMOUNT) {
      this.endGame(true);
    }
  }

  updateSpeedLevel() {
    if (this.state.currentQuestion >= this.roundQuestions.length) {
      return;
    }

    this.state.level = this.roundQuestions[this.state.currentQuestion].levelSpeed;
  }

  updateScore() {
    this.state.points += constants.POINTS[this.state.level];
  }

  endGame(isWin) {
    this.state.isGameEnded = {
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
        levelSpeed: this.getLevelSpeed(i),
      };

      words.push(word);
    }

    return words;
  }

  getLevelSpeed(indexOnPage) {
    const levelRanges = this.constructor.divideIntoLevels(constants.QUESTIONS_AMOUNT);
    let level;
    const isInRange = (min, max, key) => {
      return key >= min && key <= max;
    }

    Object.entries(levelRanges)
      .forEach(([levelName, minmax]) => {
        if (isInRange(...minmax, indexOnPage)) {
          level = levelName;
        }
      });

    return level;
  }

  static divideIntoLevels(wordsAmount) {
    const levelsAmount = constants.LEVELS.length;
    const levelsRange = {};
    const levelWordsAmount = Math.ceil(wordsAmount / levelsAmount);
    const getRangeMin = (index) => {
      return index * levelWordsAmount;
    }
    const getRangeMax = (index) => {
      const result = ((index + 1) * levelWordsAmount) - 1;

      return result > wordsAmount ? wordsAmount - 1 : result;
    }

    constants.LEVELS.forEach((levelName, index) => {
      levelsRange[levelName] = [getRangeMin(index), getRangeMax(index)];
    });

    return levelsRange;
  }

  getAnswerOptions(correctAnswer) {
    let wrongAnswersList = this.constructor.getWrongAnswersList(this.roundWordsList, correctAnswer);

    wrongAnswersList = this.constructor.getQuestionOptions(wrongAnswersList);
    const optionsList = this.constructor.addAnswerToOptions(wrongAnswersList, correctAnswer);

    return optionsList;
  }

  static getWrongAnswersList(data, correctAnswer) {
    const answerIndex = data.findIndex((item) => item.id === correctAnswer.id);
    const words = data.map((wordDataItem) => wordDataItem.wordTranslate);

    words.splice(answerIndex, 1);
    return words;
  }

  static getQuestionOptions(optionsList) {
    const optionsListCopy = Array.from(new Set(optionsList));
    const randomOptions = new Array(constants.ANSWERS_OPTIONS_AMOUNT - 1).fill('')
      .map(() => {
        const randomOptionsIndex = getRandomNumber(0, optionsListCopy.length - 1);

        return optionsListCopy.splice(randomOptionsIndex, 1)[0];
      });

    return randomOptions;
  }

  static addAnswerToOptions(options, correctAnswer) {
    const randomPosition = getRandomNumber(0, constants.ANSWERS_OPTIONS_AMOUNT - 1);

    options.splice(randomPosition, 0, correctAnswer.wordTranslate);
    return options;
  }
}