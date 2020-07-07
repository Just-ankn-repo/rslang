/* eslint-disable import/extensions */
/* eslint-disable no-param-reassign */
import gallery from '../../../../../static/images/englishPuzzle/icon/gallery.png'
import speakernotes from '../../../../../static/images/englishPuzzle/icon/speaker-notes.png'
import musicalnotes from '../../../../../static/images/englishPuzzle/icon/musical-notes.png'
import roomsound from '../../../../../static/images/englishPuzzle/icon/room-sound.png'

import imagelevel1 from './level1.js';
import imagelevel2 from './level2.js';
import imagelevel3 from './level3.js';
import imagelevel4 from './level4.js';
import imagelevel5 from './level5.js';
import imagelevel6 from './level6.js';
import Puzzle from './classes';

function buttonclick(buttonelement, url, urloff) {
    if (buttonelement.target.classList.contains('game-puzzle__button_active')) {

        buttonelement.target.style.backgroundImage = `url('${urloff}')`;
        buttonelement.target.classList.remove('game-puzzle__button_active');
    } else {
        buttonelement.target.style.backgroundImage = `url('${url}')`;
        buttonelement.target.classList.add('game-puzzle__button_active');
    }
}
const sortListById = (list) => {
    const listElements = [...list.children]
    let sed = listElements.sort((a, b) => parseInt((a.classList[2]).replace(/\D+/g, ""), 10) - parseInt((b.classList[2]).replace(/\D+/g, ""), 10));
    list.innerHTML = '';
    list.append(...sed);

}

function buttonaddevent() {
    const buttontransfer = document.querySelector('.game-puzzle__button_transfer');
    const buttonsound = document.querySelector('.game-puzzle__button_sound');
    const buttonsoundpaly = document.querySelector('.game-puzzle__button_puzzle-sound-play');
    const buttonsoundauto = document.querySelector('.game-puzzle__button_sound_auto');
    const buttonimg = document.querySelector('.game-puzzle__button_puzzle-img');
    const buttonstart = document.querySelector('.game-puzzle__start');
    const buttonidont = document.querySelector('.game-puzzle__button_idont');
    const buttonchek = document.querySelector('.game-puzzle__button_chek');
    const buttoncontinue = document.querySelector('.game-puzzle__button_continue');

    buttonidont.addEventListener('click', () => {
        const groupwords = document.querySelector('.group-words');
        const words = document.querySelector('.group-words').childNodes;
        const sentence = document.querySelector('.game-puzzle__sentenceField_active');
        sentence.append(...words);
        document.querySelectorAll('.convas__convasclone').forEach((word) => {
            word.remove();
        });
        const sentencechild = sentence.childNodes;
        groupwords.innerHTML = '';
        sortListById(sentence);
        sentencechild.forEach((word) => {
            word.onmousedown = () => {};
            const clone = word.cloneNode(true);
            groupwords.append(clone);
        });
        buttonidont.classList.add('game-puzzle__button_hidden');
        buttoncontinue.classList.remove('game-puzzle__button_hidden');
        sentence.classList.remove('game-puzzle__sentenceField_active');
    });
    buttontransfer.addEventListener('click', (el) => buttonclick(el, speakernotes, 'img/speaker-notes-off.png'));
    buttonsound.addEventListener('click', (el) => {
        buttonclick(el, roomsound, 'img/mute.png');
        if (el.target.classList.contains('game-puzzle__button_active'))
            buttonsoundpaly.style.opacity = 1;
        else buttonsoundpaly.style.opacity = 0;
    });
    buttonsoundauto.addEventListener('click', (el) => buttonclick(el, musicalnotes, 'img/musical-notes-off.png'));
    buttonimg.addEventListener('click', (el) => buttonclick(el, gallery, 'img/gallery-off.png'));
    buttonsoundpaly.addEventListener('click', (el) => { el.target.classList.add('game-puzzle__button_active') });
    buttonstart.addEventListener('click', () => {
        document.querySelector('.game-puzzle__startPage').style.opacity = 0;
        document.querySelector('.game-puzzle__wrapper').style.opacity = 1;
        setTimeout(() => { document.querySelector('.game-puzzle__startPage').style.display = `none` }, 500);
    });

}

class GameMechanics {
    constructor(elementLevel, elementPage, elementPlayingField) {
        this.levelimg = [imagelevel1, imagelevel2, imagelevel3, imagelevel4, imagelevel5, imagelevel6];
        this.puzzle = new Puzzle();
        this.Level = elementLevel;
        this.Page = elementPage;
        this.elementPlayingField = elementPlayingField;
        this.urlimg = 'https://english-puzzle-data-team61.team61.vercel.app/';
        this.sentencenumber = 0;
        this.sentetype = 0;
    }

    async createPuzzle() {
        this.puzzle = new Puzzle(this.Level.value, this.Page.value, this.urlimg + this.levelimg[this.Level.value - 1][this.Page.value].cutSrc, '#sentence', '#table', true);
        await this.puzzle.loadPuzzle();
        this.sentencenumber = 0;
        this.addsentence();
    }

    addsentence() {
        this.puzzle.addDomSentencePuzzle(this.sentetype, this.sentencenumber);
        this.puzzle.mixConvasElements();
        const sentenceField = document.createElement('div');
        sentenceField.id = `sentence${this.sentencenumber}`;
        sentenceField.classList.add('game-puzzle__sentenceField');
        sentenceField.classList.add('game-puzzle__sentenceField_active')
        this.elementPlayingField.appendChild(sentenceField);
    }
}

export default async function def() {
    buttonaddevent();
    const game = new GameMechanics(document.querySelector('.game-puzzle__select_level'), document.querySelector('.game-puzzle__select_page'), document.querySelector('.game-puzzle__main'));
    await game.createPuzzle();
    game.addsentence();
    const buttonidont = document.querySelector('.game-puzzle__button_idont');
    const buttoncontinue = document.querySelector('.game-puzzle__button_continue');
    buttoncontinue.addEventListener('click', () => {
            if (game.sentencenumber === 9) {
                const puzle = document.querySelector('.group-words');
                const main = document.querySelector('.game-puzzle__main');
                main.innerHTML = '';
                const picture = game.levelimg[game.Level.value - 1][game.Page.value];
                puzle.innerHTML = `${picture.name} ${picture.author} ${picture.year}`;
                document.querySelector('#sentence').innerHTML = '';
                console.log(picture.cutSrc);
                main.style.backgroundImage = `url('${game.urlimg+picture.cutSrc}')`;
            } else {
                game.sentencenumber += 1;
                game.addsentence();
                buttonidont.classList.remove('game-puzzle__button_hidden');
                document.querySelector('.game-puzzle__main').style.width = `${document.querySelector('.group-words').offsetWidth + 33}px`;
            }
        }

    );
    game.Level.addEventListener("change", () => {
        const main = document.querySelector('.game-puzzle__main');
        main.innerHTML = '';
        game.createPuzzle();

    });
    game.Page.addEventListener("change", () => {
        const main = document.querySelector('.game-puzzle__main');
        main.innerHTML = '';
        game.createPuzzle();

    });
    document.querySelector('.game-puzzle__main').style.width = `${document.querySelector('.group-words').offsetWidth + 33}px`;
    window.addEventListener(`resize`, () => {
        document.querySelector('.game-puzzle__main').style.width = `${document.querySelector('.group-words').offsetWidth + 33}px`;
    }, false);
}