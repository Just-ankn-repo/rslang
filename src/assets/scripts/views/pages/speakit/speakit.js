import Game from "./Game";
import { words, pageArray, levelArray } from "./Constants";
import getWords from "./Api";

const SpeakIt = {
  render: async () => {
    const view = /* html */ `
			<div class="start-screen"style="margin:0; width:100%; height:100%;">
				<div class="wrapper start-screen-wrapper">
					<h1 class="start-screen__name">Speak It</h1>
					<h4 class="start-screen__text">Click on the words to hear them sound.</h4>
					<h4 class="start-screen__text">Click on the button and speak the words </br> into the microphone.</h4>
					<button class="button start-button">Start</button>
				</div>  
			</div>

			<main class="speak-it" id="speak-it">
				<div class="wrapper main-wrapper">

					<div class="speak-header">
							<div class="levels">
								<form class="level-number" id="numderLevel">
								<p>Level: <select id="level-id" name="list1" class="selected-level">
								${levelArray.map((level) => `<option class="level" value="${level}">${level}</option>`).join('')}
								</select></p>
							</form>
							
							<form class="round-number" id="numberRound">
								<p>Round: <select name="list2" id="round-id" class="rounds-container selected-round">
								${pageArray.map((round) => `<option class="round" value="${round}">${round}</option>`).join('')}
								</select></p>
							</form>
								
							</div>
							<div class="score"></div>
					</div>

					<div class="selected">
						<img class="image" src="https://image.freepik.com/free-vector/creative_23-2147886551.jpg">
						<p class="translation"></p>
          </div>

					<div id="content"></div>

					<div class="tools">
						<div class="buttons-control">
								<button class="button restart-button">Restart</button>
								<button class="button speak-button">Speak please</button>
								<button class="button finish-button">Finish</button>
						</div>
					</div>

				</div>
			</main>

			<div class="statistics none">
						
						<div class="statistics-container">
								<div class="guessed-container"></div>
								<div class="errors-container"></div>
						</div>
						<div class="buttons-control">
						<button class="button close-button">CONTINUE</button>
						<button class="button new-game-button">NEW GAME</button>
						</div>
    	</div>
			`;
		return view;
  },
  after_render: async () => {
		const game = new Game(words);
		let page = 0;
		let group = 0;
		getWords(page, group)

		window.SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
    /* global SpeechRecognition */
    const recognition = new SpeechRecognition();
    recognition.interimResults = false;
    recognition.lang = 'en-En';

    recognition.addEventListener('result', (el) => {
      const transcript = Array.from(el.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
				.join('').toLowerCase();
			console.log(transcript)
			document.querySelector('.translation').innerHTML = transcript;
			game.checkWord(transcript)
			return words;
		});

		recognition.addEventListener('end', recognition.start);


		//! BUTTONS

		document.querySelector('.start-button').addEventListener('click', () => {
      document.querySelector('.start-screen').classList.add('none');
      document.querySelector('.speak-it').classList.remove('none');
		});
		document.querySelector('.speak-button').addEventListener('click', () => {
			game.removePointEvent()
			recognition.addEventListener('end', recognition.start);
			recognition.start();
			game.startGame()
    });
		document.querySelector('.finish-button').addEventListener('click', () => {
			recognition.removeEventListener('end', recognition.start);
			recognition.stop();
			game.endGame();
		})
		document.querySelector('.close-button').addEventListener('click', () => {
			recognition.addEventListener('end', recognition.start);
			document.querySelector('.statistics').classList.add('none');
			document.querySelector('.speak-it').classList.remove('none');
		})
		document.querySelector('.restart-button').addEventListener('click', () => {
			game.clearStatistic()
			game.newGame()
		})
		document.querySelector('.new-game-button').addEventListener('click', () => {
			getWords(page, group)
			game.newGame()
		})


		//! LEVELS AND ROUNDS
		
  	document.querySelector('.selected-round').addEventListener('change', () => {
			const select = document.getElementById('round-id')
			page = select.options[select.selectedIndex].value - 1;
			game.clearStatistic()
			getWords(page, group)
			recognition.removeEventListener('end', recognition.start);
			recognition.stop();
  	})
		document.querySelector('.selected-level').addEventListener('change', () => {
			const select = document.getElementById('level-id')
			group = select.options[select.selectedIndex].value - 1;
			game.clearStatistic()
			getWords(page, group)
			recognition.removeEventListener('end', recognition.start);
			recognition.stop();
		})
  },
};

export default SpeakIt;
