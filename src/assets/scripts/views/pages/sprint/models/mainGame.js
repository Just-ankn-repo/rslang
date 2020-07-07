import {words} from "./constants";
import {startTimer} from './timer';


let selectWord = 0;
let selectGroup = 0;
let selectPage = 0;
let points = 0;
let pointsBonus = 10;
let countCorrect = -1;

let view = {
    renderField: function () {
        return ` 
                <div class="col-lg-9 game-field">
                <div class="game-field__score">
                <p>Score</p>
                </div>
                <div class="game-field__card">
                <div class="game-field__card-info">
                <div class="game-field__card-info__level">
                    <span class="level-info">1</span>
                </div>
                <div class="rate">
                <div class="rate__circle"></div>
                <div class="rate__circle"></div>
                <div class="rate__circle"></div>
                </div>
                 <div class="game-field__card-info__difficulty">
                    <span class="difficulty-info">Beginner</span>
                </div>
                <span class="speed-info">+10 очков за слово!</span>
                </div>
                <div class="game-field__card-stars">
                <div class="star"></div>
                </div>
                <span id="word" class="game-field__card-word">funny</span>
                <span id="wordTranslate" class="game-field__card-word-translation">Смешной</span>
                <div class="game-field__card-buttons">
                <div class="game-field__card-success"></div>
                <div class="game-field__card-error"></div>
                <button id="no" type="button" class="btn btn-danger">Incorrect</button>
                <button id="yes" type="button" class="btn btn-success">Сorrect</button>
                </div>
                </div>
                <div class="game-field__keys">
                <div class="game-field__keys-left">
                <span>Incorrect    &#8212;</span>
                <kbd>&#129044;</kbd>
                </div>
                <div class="game-field__keys-right">
                <kbd>&#129046;</kbd>
                <span>&#8212;    Correct</span>
                </div>              
            </div>
            </div>
            <div class="col-lg-3">
                <div class="time-field">
                <div class="time-field__info">
                <p>Time</p>
                </div>
                <div class="time-field__timer">
                <div id="pie" class="pie">
                <span class="block"></span>
                <span id="time">60</span>
                </div>
                </div>
                </div>
                <div class="info-level">
                    <span>Level: </span>
                    <span class="level">1</span>
                </div>
                <div class="info-difficulty">
                    <span>Difficulty: </span>
                    <span class="difficulty">Beginner</span>
                </div>           
                </div>`;
    },
    renderStatistic: function (parent) {
        parent.innerHTML = `<div class="statistic">
                                    <div class="statistic__score">
                                        <span>Your score: </span>
                                        <div class="score"><span>1965</span></div>
                                    </div>
                                    <div class="statistic__word">
                                        <span class="title">Statistic</span>
                                        <ul class="learn">
                                            <span>Learned words</span>
                                        </ul>
                                        <ul class="mistake">
                                            <span >Mistakes in words</span>
                                        </ul>
                                    </div>
                                    <div class="statistic__button"><button id="repeat" type="button" class="btn btn-success">Start again</button></div>
                                </div>`;

        parent.querySelector('#repeat').addEventListener('click', ()=> {
            location.reload();
        });
        const score= parent.querySelector('.score');
        score.firstChild.innerText = points;
        words.forEach((element)=> {
            if(element.incorrect=== 0) {
                const correctList= parent.querySelector('.learn');
                const correctWord= document.createElement('li');
                const correctIcon = document.createElement('div');
                const correctText = document.createElement('span');
                correctIcon.classList.add('success');
                correctText.innerText = `${element.word} - ${element.wordTranslate}.`;
                correctWord.appendChild(correctIcon);
                correctWord.appendChild(correctText);
                correctList.appendChild(correctWord);
            }else if(element.incorrect!== undefined) {
                const incorrectList= parent.querySelector('.mistake');
                const incorrectWord= document.createElement('li');
                const incorrectIcon = document.createElement('div');
                const incorrectText = document.createElement('span');
                incorrectIcon.classList.add('error');
                incorrectText.innerText = `${element.word} - ${element.wordTranslate}.`;
                incorrectWord.appendChild(incorrectIcon);
                incorrectWord.appendChild(incorrectText);
                incorrectList.appendChild(incorrectWord);
            }
        })

    },
    showWord: function (thisWord, thisWordTranslate) {
        const word = document.getElementById('word');
        const wordTranslate = document.getElementById('wordTranslate');
        word.innerText = thisWord;
        wordTranslate.innerText = thisWordTranslate;
    },

    showStars: function (parent, count) {
        parent.innerHTML='';
        let star;
        for( let i=1; i<=count; i++) {
            star=document.createElement('div');
            star.classList.add('star');
            star.classList.add(`star-${i}`)
            parent.appendChild(star);
        }

    },

    showSpeed: function (parent, stars, points) {

        switch (points) {
            case 10:
                parent.classList.add('speed-10');
                this.showStars(stars, 1);
                break;
            case 20:
                parent.classList.add('speed-20');
                this.showStars(stars, 2);
                break;
            case 40:
                parent.classList.add('speed-40');
                this.showStars(stars, 3);
                break;
            case 80:
                parent.classList.add('speed-80');
                this.showStars(stars, 4);
                break;
        }
    },

    showRate: function (parent, index) {
        const rates = parent.querySelectorAll('.rate__circle');
        rates[index].classList.add('active');
    },

    clearRate: function (parent) {
        const rates = parent.querySelectorAll('.rate__circle');
        rates.forEach((el) => {
            el.classList.remove('active');
        });
    },

    showSettings: function (parent, level, diff) {
        const levelMobile = parent.querySelector('.level-info');
        const diffMobile = parent.querySelector('.difficulty-info');
        const levelPc = parent.querySelector('.level');
        const diffPc = parent.querySelector('.difficulty');

        levelMobile.innerText= level;
        levelPc.innerText = level;
        switch (diff) {
            case 'Beginner':
                diffMobile.innerText = 'A0';
                break;
            case 'Elementary':
                diffMobile.innerText = 'A1';
                break;
            case 'Pre-Intermediate':
                diffMobile.innerText = 'A2';
                break;
            case 'Intermediate':
                diffMobile.innerText = 'B1';
                break;
            case 'Upper-Intermediate':
                diffMobile.innerText = 'B2';
                break;
            case 'Advanced':
                diffMobile.innerText = 'C1';
                break;
        }
        diffPc.innerText = diff;
    }
}

let model = {
    getWords: async function (group, page) {
        const url = `https://afternoon-falls-25894.herokuapp.com/words?page=${page}&group=${group}`;
        const res = await fetch(url);
        const data = await res.json();
        return Array.from(data);
    }
}

let controller = {

    loadStatistic: function (parent) {
        view.renderStatistic(parent);
    },

    loadField: function (parent, level, diff) {
        setTimeout(() => {
            parent.innerHTML = view.renderField();
            view.showWord(words[selectWord].word, words[getRandomInt()].wordTranslate);
            view.showSettings(parent,level,diff);
            parent.querySelector('#no').addEventListener('click', () => {
                equalWords(parent, parent.querySelector('#no'));
            });
            parent.querySelector('#yes').addEventListener('click', () => {
                equalWords(parent, parent.querySelector('#yes'));
            });
            startTimer(parent);
            document.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowRight') {
                    equalWords(parent, parent.querySelector('#yes'));
                }
                if (e.key === 'ArrowLeft') {
                    equalWords(parent, parent.querySelector('#no'));
                }
            });
        }, 4500);
    },

    loadWord: function (group, page) {
        model.getWords(group, page).then(dataWords => {
            selectWord = 0;
            console.log(dataWords);
            dataWords.forEach((element) => {
                words.push(element);
            });
        });
    },

    changeSpeed: function (parent, stars, points) {

        parent.classList.remove('speed-10');
        parent.classList.remove('speed-20');
        parent.classList.remove('speed-40');
        parent.classList.remove('speed-80');


        view.showSpeed(parent, stars, points)
    }
}

function getRandomInt() {
    const randomValue = Math.random();
    if(randomValue<0.4) {
        return selectWord;
    }else {
        return Math.floor(randomValue * ((selectWord>15 ? 15 : selectWord + 4) - selectWord) + selectWord);
    }
}

function equalWords(parent, button) {
    const thisWordTranslate = parent.querySelector('.game-field__card-word-translation');
    const successIcon = parent.querySelector('.game-field__card-success');
    const errorIcon = parent.querySelector('.game-field__card-error');
    const score = parent.querySelector('.game-field__score').querySelector('p');
    const speed = parent.querySelector('.speed-info');
    const infoField = parent.querySelector('.game-field__card-info');
    const gameField = parent.querySelector('.game-field__card');
    const starsField = parent.querySelector('.game-field__card-stars');
    const audioSuccess = new Audio('./audio/correct.mp3');
    const audioError = new Audio('./audio/wrong.mp3');
    const audioCombo = new Audio('./audio/combo.mp3');

    const correct = () => {
        successIcon.style.opacity = '1';
        gameField.style.borderColor = '#4caf50';
        setTimeout(() => {
            successIcon.style.opacity = '0';
            gameField.style.borderColor = '#ffffff';
        }, 500);

        countCorrect++;
        view.showRate(parent, countCorrect);
        if (countCorrect === 2) {
            pointsBonus *= pointsBonus < 80 ? 2 : 1;
            points += pointsBonus;
            countCorrect = -1;
            audioCombo.play();
            setTimeout(() => {
                view.clearRate(parent);
            }, 200);
        } else {
            points += pointsBonus;
        }
        speed.innerText = `+ ${pointsBonus} очков за слово!`;
        score.innerText = points;
    }
    const error = () => {
        errorIcon.style.opacity = '1';
        gameField.style.borderColor = '#f44336';
        setTimeout(() => {
            errorIcon.style.opacity = '0';
            gameField.style.borderColor = '#ffffff';
        }, 500);
        countCorrect = -1;
        view.clearRate(parent);
        pointsBonus = 10;
        speed.innerText = `+ ${pointsBonus} очков за слово!`;
        score.innerText = points;
    }

    switch (button.id) {
        case 'yes':
            if (words[selectWord].wordTranslate === thisWordTranslate.innerText) {
                correct();
                words[selectWord].incorrect=0;
                audioSuccess.play();
            } else {
                error();
                words[selectWord].incorrect=1;
                audioError.play();
            }
            break;
        case 'no':
            if (words[selectWord].wordTranslate !== thisWordTranslate.innerText) {
                correct();
                words[selectWord].incorrect=0;
                audioSuccess.play();
            } else {
                error();
                words[selectWord].incorrect=1;
                audioError.play();
            }
            break;
    }
    controller.changeSpeed(infoField, starsField, pointsBonus);
    selectWord!==19?selectWord++: selectWord = 0;
    view.showWord(words[selectWord].word, words[getRandomInt()].wordTranslate);

}

export default controller;
