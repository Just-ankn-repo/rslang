// including both min and max as possible values
function getRandomNumber(min, max) {
  const rand = min + Math.random() * (max + 1 - min);

  return Math.floor(rand);
}

function shuffleWords(words) {
  return words.sort(() => Math.random() - 0.5);
}

export { getRandomNumber, shuffleWords };