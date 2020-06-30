import generateContainer from "./Container";
import { words } from "./Constants";

export default function getWords(page, group) {
  const url = `https://afternoon-falls-25894.herokuapp.com/words?page=${page}&group=${group}&wordsPerExampleSentenceLTE=10&wordsPerPage=10`;
  return fetch(url)
    .then((res) => res.json())
    .then((data) => {
      data.forEach((elem) => words.push(elem));
      const div = generateContainer(data);
      document.getElementById('content').innerHTML = '';
      document.getElementById('content').append(div);
    });
};
