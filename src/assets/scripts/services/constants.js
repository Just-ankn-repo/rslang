export default ({
  defaultSettings: {
    wordsPerDay: 50,
    optional: {
      newWordsPerDay: 30,
      cardContent: {
        image: true,
        wordTranslate: true,
        textMeaning: true,
        textExample: true,
        audioMeaning: true,
        audioExample: true,
        transcription: true,
        defineLevelOptions: true,
        deleteBtn: true,
        toHardListBtn: true,
        showAnswerBtn: true,
      },
    },
  },

  defaultStatistics: {
    learnedWords: 0,
    optional: {
      learnWords: {
        default: true,
      },
      savannah: {
        default: true,
      },
      speak_it: {
        default: true,
      },
      audio_challenge: {
        default: true,
      },
      english_puzzle: {
        default: true,
      },
      sprint: {
        default: true,
      },
      englishQuiz: {
        default: true,
      },
    }
  },
});
