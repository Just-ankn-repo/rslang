import { generateErrorsContainer, generateGuessedContainer } from "./Container";
import { words, success } from "./Constants";
import Card from "./Card";

export default class Game {
  constructor() {
    this.gameStarted = false;
    this.starContainer = document.querySelector('.score');
    this.wordsForGame = words;
    this.items = document.querySelectorAll('.item')
    this.guessed = document.querySelector('.guessed-container');
    this.error = document.querySelector('.errors-container');
    this.card = new Card(words);
  }

  startGame() {
    this.gameStarted = true;
    document.querySelector('.speak-button').classList.add('recording');
  }

  checkWord(transcript) {
    this.transcript = transcript;
			words.forEach((item) => {
				if (item.word.includes(transcript)) {
				const guessedWord = words.findIndex(elem => elem.word === transcript)
				success.push(item);
        words.splice(guessedWord, 1)
				document.querySelector('.image').setAttribute('src', `https://raw.githubusercontent.com/ValeriaKorzhenevskaya/rslang-data/master/${item.image}`)
				document.querySelector('.score').innerHTML += `<object class="star"></object>`;
				document.querySelector(`#${transcript}`).classList.add('guessed');
			} 
			})
  }

  newGame() {
    this.gameStarted = false;
    document.querySelector('.score').innerHTML = '';

    document.querySelectorAll('.item').forEach((item) => {
      if (item.classList.contains('guessed')) {
        item.classList.remove('guessed')
      }
    })
    this.clearStatistic()
    document.querySelector('.translation').innerHTML = '';
    document.querySelector('.image').setAttribute('src', 'https://image.freepik.com/free-vector/creative_23-2147886551.jpg')
    document.querySelector('.speak-button').classList.remove('recording');
    document.querySelector('.statistics').classList.add('none');
		document.querySelector('.speak-it').classList.remove('none');
  }

  endGame() {
    this.gameStarted = false;
    document.querySelector('.speak-it').classList.add('none');
    document.querySelector('.statistics').classList.remove('none');
    document.querySelector('.speak-button').classList.remove('recording');
    const guessedContainer = generateGuessedContainer(success)
		const errorsContainer = generateErrorsContainer(words)
    this.clearStatistic()
		document.querySelector('.guessed-container').append(guessedContainer)
		document.querySelector('.errors-container').append(errorsContainer)
  }

  clearStatistic() {
    this.guessed.innerHTML = '';
		this.error.innerHTML = '';
  }
}
