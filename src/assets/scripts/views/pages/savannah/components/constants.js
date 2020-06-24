const constants = {
  QUESTIONS_AMOUNT: 20,
  LIVES_AMOUNT: 5,
  ANSWERS_OPTIONS_AMOUNT: 4,
  LEVELS: ['slow', 'moderate', 'fast'],
  POINTS: {
    slow: 100,
    moderate: 200,
    fast: 300,
  },
  START_TIME: 3,
  SECOND: 1000,
  QUESTION_SPEED: {
    slow: 14,
    moderate: 10,
    fast: 7,
  },
  PAGES_RANGE: {
    min: 0,
    max: 29,
  },
  LANG_LEVEL: ['beginner', 'elementary', 'pre-intermediate', 'intermediate', 'upper-intermediate', 'advanced'],
  LANG_LEVELS_SHORTHANDS: ['A0', 'A1', 'A2', 'B1', 'B2', 'C1'], 
  ROUNDS_AMOUNT: 30,
  MAX_POINTS: 1800,
  DATA_URL: 'https://raw.githubusercontent.com/irinateln0va/rslang-data/master/',
  DEFAULT_LEVEL: 0,
  DEFAULT_ROUND: 0,
  KEY_ANSWERS: [1, 2, 3, 4],
}

export default constants;