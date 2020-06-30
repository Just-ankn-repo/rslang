import Card from "./Card";

export default function generateContainer(data) {
  const div = document.createElement('div');
  div.className = 'words';
  div.id = 'words';

  const generateCards = () => {
    const cards = data.map((card) => new Card(card).generateDivForCards());
    return cards;
  };
  const arrCards = generateCards(data);
  div.append(...arrCards);
  return div;
}

export function generateGuessedContainer(success) {
  const div = document.createElement('div');
  div.className = 'correctly';
  div.id = 'correctly';

  const generateGuessedCards = () => {
    const cards = success.map((card) => new Card(card).generateDivForStatistic());
    return cards;
  };
  const arrGuessedCards = generateGuessedCards(success);
  const correctly = `Правильно: ${success.length}`;

  div.append(correctly, ...arrGuessedCards);
  return div;
}

export function generateErrorsContainer(words) {
  const div = document.createElement('div');
  div.className = 'errors';
  div.id = 'errors';

  const generateErrorsCards = () => {
    const cards = words.map((card) => new Card(card).generateDivForStatistic());
    return cards;
  };
  const arrErrorsCards = generateErrorsCards(words);
  const errors = `Ошибок: ${words.length}`;
  div.append(errors, ...arrErrorsCards);
  return div;
}
