import generateContainer from "./Container";
import { words, success } from "./Constants";

export default function getWords(page, group) {
  const url = `https://afternoon-falls-25894.herokuapp.com/words?page=${page}&group=${group}&wordsPerExampleSentenceLTE=10&wordsPerPage=10`;
  return fetch(url)
    .then((res) => res.json())
    .then((data) => {
      words.splice(0, words.length, ...data)
      success.splice(0, success.length)
      const div = generateContainer(data);
      document.getElementById('content-container').innerHTML = '';
      document.getElementById('content-container').append(div);

      document.querySelector('.translation').innerHTML = '';
      document.querySelector('.image').setAttribute('src', 'https://image.freepik.com/free-vector/creative_23-2147886551.jpg')
      document.querySelector('.speak-button').classList.remove('recording');
      document.querySelector('.speakit-score').innerHTML = '';
    });
};
