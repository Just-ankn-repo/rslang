import Card from "./Card";

export default function generateContainer(items) {
  const div = document.createElement('div');
  div.className = 'dictionary-container';

  const generate = () => {
    const cards = items[0].paginatedResults.map((card) => new Card(card).generateDivForCards());
    return cards;
  };

  const arrCards = generate(items);
  div.append(...arrCards);
  return div;
}
