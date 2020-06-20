const constants = {
  QUESTIONS_AMOUNT: 1,
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
  GROUPS_RANGE: {
    level: {
      slow: [0, 1],
      moderate: [2, 3],
      fast: [4, 5],
    }
  },
  MAX_POINTS: 1800,
  ANSWERS_AMOUNT: 30,
  DATA_URL: 'https://raw.githubusercontent.com/irinateln0va/rslang-data/master/',
}

const getLevelFromGroup = (group) => {
  const groupsList = Object.keys(constants.GROUPS_RANGE.level);
  const levelIndex = Math.floor(group / constants.GROUPS_RANGE.level.slow.length);

  return groupsList[levelIndex];
}

export { constants, getLevelFromGroup };