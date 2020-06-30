/* eslint-disable no-unused-vars */
import backend from './backend';

const testBackendMethods = async() => {
// ---
  // const updateUser = await backend.updateUser({ email: '', password: ''})
  // console.log(updateUser)

// ---
  const setUserSettings = await backend.setUserSettings(
    { wordsPerDay: 10,
      optional: {
        language: 'en'
      } })
  console.log(setUserSettings)

// ---
  const getUserSettings = await backend.getUserSettings();
  console.log(getUserSettings)

// ---
  const setUserStatistics = await backend.setUserStatistics(
    { learnedWords: 10,
      optional: {
        savannah: {
          level: 1,
          page: 5
        },
        speak_it: {
          level: 0,
          page: 0
        },
        audio_challenge: {
          level: 3,
          page: 5
        },
        english_puzzle: {
          level: 0,
          page: 0
        },
        sprint: {
          level: 0,
          page: 0
        },
        our_game: {
          level: 7,
          page: 8
        }
      } })
  console.log(setUserStatistics)

// ---
  const getUserStatistics = await backend.getUserStatistics();
  console.log(getUserStatistics)

// ---
  const forExampleAggregatedWordsGenerate = await backend.getUsersAggregatedWordsWithFilters(
    { wordsPerPage: 1,
      group: 1,
      filter: {"$and":[{"userWord.difficulty":"hard", "userWord.optional.key":"value"}]},
    }
  );

  const getUsersAggregatedWordsById = await backend.getUsersAggregatedWordsById('5e9f5ee35eb9e72bc21af7a5');
  console.log(getUsersAggregatedWordsById)

  const forExampleAggregatedWordsClear = await backend.deleteUsersWordsById('5e9f5ee35eb9e72bc21af7a5');

// ---
  const getWordsWithFilters = await backend.getWordsWithFilters(
    { group: 1,
      page: 1,
      wordsPerExampleSentenceLTE: 5,
      wordsPerPage: 1
    }
  );
  console.log(getWordsWithFilters)

// ---
  const getWordsCount = await backend.getWordsCount(
    { group: 1,
      wordsPerExampleSentenceLTE: 5,
      wordsPerPage: 1
    }
  );
  console.log(getWordsCount)

// ---
  const getWordsById = await backend.getWordsById('5e9f5ee35eb9e72bc21af7a5');
  console.log(getWordsById)

// ---
  const setUsersWords = await backend.setUsersWords(
    { wordId: '5e9f5ee35eb9e72bc21af7a5',
      difficulty: 'hard',
      optional: {
        testField1: 'testValue1'
      }
    }
  );
  console.log(setUsersWords)

// ---
  const getUsersWords = await backend.getUsersWords();
  console.log(getUsersWords)

// ---
  const updateUsersWords = await backend.updateUsersWords(
    { wordId: '5e9f5ee35eb9e72bc21af7a5',
      difficulty: 'easy',
      optional: {
        testField2: 'testValue2'
      }
    }
  );
  console.log(updateUsersWords)
  
// ---
  const getUsersWordsById = await backend.getWordsById('5e9f5ee35eb9e72bc21af7a5');
  console.log(getUsersWordsById)

// ---
  const deleteUsersWordsById = await backend.deleteUsersWordsById('5e9f5ee35eb9e72bc21af7a5');
  console.log(deleteUsersWordsById)
  }

  // testBackendMethods();
