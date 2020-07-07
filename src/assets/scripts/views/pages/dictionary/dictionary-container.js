import Card from "./dictionary-card";

export default function generateContainer(data) {
  const div = document.createElement('div');
  div.className = 'dictionary-container';

  const generateCards = () => {
    const cards = data.map((card) => new Card(card).generateDivForCards());
    return cards;
  };
  const arrCards = generateCards(data);
  div.append(...arrCards);
  return div;
}
