import backend from '../../../../backend';


const currenDate = () => {
  const date = new Date();
  const day = date.getDate;
  const month = date.getMonth;
  return `${day}.${month}`;
}

export default class Service {
  static async getWords(_group = 0, _page = 1) {
    const words = await backend.getUsersAggregatedWordsWithFilters({
      wordsPerPage: 10,
      group: _group,
      page: _page,
      filter: {
        "userWord": {
          "$exists" : true
        }
      }
    })

    console.log(words[0].paginatedResults)
    return words[0].paginatedResults;
  }

  static async getSettings() {
    const settings = await backend.getUserSettings();
    return settings;
  }

  static async saveCorrectAnswer(wordsId) {
    const savedWord = await backend.getUsersWordsById(wordsId);
    const statistics = await backend.getUserStatistics();
    const currentDateStatistics = statistics.optional.learnWords[`${currenDate}`];
    const correctAnswers = currentDateStatistics ? currentDateStatistics.correct + 1 : 1;

    statistics.optional.learnWords[`${currenDate}`] = {correct: correctAnswers};
    await backend.setUserStatistics(statistics);

    if (savedWord.id) {
      const currentWordOptional = savedWord.optional;
      if (currentWordOptional) {
        const currentWordCorrect = currentWordOptional.correct;
        const newWordCorrect = currentWordCorrect ? currentWordCorrect + 1 : 1;
        savedWord.optional.correct = newWordCorrect
      } else {
        savedWord.optional = { correct: 1 };
      }

      await backend.updateUsersWords(savedWord);
    } else {
      const newWord = {
        wordId: wordsId,
        optional: {
          correct: 1
        }
      }
      await backend.setUsersWords(newWord);
    }
  }

  static async saveWrongAnswer(wordsId) {
    const savedWord = await backend.getUsersWordsById(wordsId);
    const statistics = await backend.getUserStatistics();
    const currentDateStatistics = statistics.optional.learnWords[`${currenDate}`];
    const wrongAnswers = currentDateStatistics ? currentDateStatistics.wrong + 1 : 1;

    statistics.optional.learnWords[`${currenDate}`] = {wrong: wrongAnswers};
    await backend.setUserStatistics(statistics);

    if (savedWord.id) {
      const currentWordOptional = savedWord.optional;
      if (currentWordOptional) {
        const currentWordWrong = savedWord.optional.wrong;
        const newWordWrong = currentWordWrong ? currentWordWrong + 1 : 1;
        savedWord.optional.wrong = newWordWrong
      } else {
        savedWord.optional = { wrong: 1 };
      }
      
      await backend.updateUsersWords(savedWord);
    } else {
      const newWord = {
        wordId: wordsId,
        optional: {
          wrong: 1
        }
      }
      await backend.setUsersWords(newWord);
    }
  }

  static setWordDifficulty(difficulty) {
    console.log(`difficulty set to ${difficulty}`);
  }

  static async markWordAsDifficult(wordsId) {
    const savedWord = await backend.getUsersWordsById(wordsId);
    if (savedWord.id) {
      await backend.updateUsersWords({wordId: wordsId, difficulty: 'hard'});
    } else {
      await backend.setUsersWords({ wordId: wordsId, difficulty: 'hard'});
    }
  }

  static async deleteWord(wordId) {
    await backend.deleteUsersWordsById(wordId);
    console.log(`${wordId} was deleted`);
  }

  static onShowAnswerBtn(wordId) {
    console.log(`for ${wordId} solution was shown`);
  }

  static async onContentSettingsChange(userSettings) {
    const settings = {
      optional: {
        cardContent: userSettings
      }
    }
    await backend.setUserSettings(settings)
  }
}