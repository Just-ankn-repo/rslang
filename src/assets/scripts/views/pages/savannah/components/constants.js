const constants = {
  QUESTIONS_AMOUNT: 5,
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
  // GROUPS_RANGE: {
  //   level: {
  //     slow: [0, 6],
  //     moderate: [7, 13],
  //     fast: [14, 19],
  //   }
  // },
  LANG_LEVEL: ['beginner', 'elementary', 'pre-intermediate', 'intermediate', 'upper-intermediate', 'advanced'],
  ROUNDS_AMOUNT: 30,
  MAX_POINTS: 1800,
  // ANSWERS_AMOUNT: 6,
  DATA_URL: 'https://raw.githubusercontent.com/irinateln0va/rslang-data/master/',
}

// const isInRange = (min, max, key) => {
//   return key >= min && key <= max;
// }

// const getLevelFromIndex = (indexOnPage) => {
  // let level;

  // Object.entries(constants.GROUPS_RANGE.level)
  //   .forEach(([levelName, minmax]) => {
  //     if (isInRange([...minmax], indexOnPage)) {
  //       level = levelName;
  //     }
  //   });
  // return level;
  
  // const groupsList = Object.keys(constants.GROUPS_RANGE.level);
  // const levelIndex = Math.floor(group / constants.GROUPS_RANGE.level.slow.length);

  // return groupsList[levelIndex];
// }

export default constants;