import gallery from '../../../../../static/images/englishPuzzle/icon/gallery.png'
import speakernotes from '../../../../../static/images/englishPuzzle/icon/speaker-notes.png'
import musicalnotes from '../../../../../static/images/englishPuzzle/icon/musical-notes.png'
import roomsound from '../../../../../static/images/englishPuzzle/icon/room-sound.png'
import GameMechanics from './game'


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
    const listElementssort = listElements.sort((a, b) => parseInt((a.classList[2]).replace(/\D+/g, ""), 10) - parseInt((b.classList[2]).replace(/\D+/g, ""), 10));
    list.innerHTML = '';
    list.append(...listElementssort);

}

function removechek() {
    document.querySelectorAll('.convas__bottom_red').forEach((el) => { el.classList.remove('convas__bottom_red') });
    document.querySelectorAll('.convas__bottom_green').forEach((el) => { el.classList.remove('convas__bottom_green') });
}

function buttonaddevent() {
    const buttontransfer = document.querySelector('.game-puzzle__button_transfer');
    const buttonsound = document.querySelector('.game-puzzle__button_sound');
    const buttonsoundpaly = document.querySelector('.game-puzzle__button_puzzle-sound-play');
    const buttonsoundauto = document.querySelector('.game-puzzle__button_sound_auto');
    const buttonimg = document.querySelector('.game-puzzle__button_puzzle-img');
    const buttonstart = document.querySelector('.game-puzzle__start');
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
export default async function def() {
    buttonaddevent();
    const buttonidont = document.querySelector('.game-puzzle__button_idont');
    let sentence = document.querySelector('.game-puzzle__sentenceField_active');
    const buttonchek = document.querySelector('.game-puzzle__button_chek');

    const buttoncontinue = document.querySelector('.game-puzzle__button_continue');
    const buttonimg = document.querySelector('.game-puzzle__button_puzzle-img');
    const buttontransfer = document.querySelector('.game-puzzle__button_transfer');
    const buttonsound = document.querySelector('.game-puzzle__button_sound');
    const buttonsoundpaly = document.querySelector('.game-puzzle__button_puzzle-sound-play');
    const buttonsoundauto = document.querySelector('.game-puzzle__button_sound_auto');
    const game = new GameMechanics(document.querySelector('.game-puzzle__select_level'), document.querySelector('.game-puzzle__select_page'), document.querySelector('.game-puzzle__main'));
    await game.createPuzzle();

    function calculationwidth() { document.querySelector('.game-puzzle__main').style.width = `${document.querySelector('.group-words').offsetWidth + 35}px`; }
    calculationwidth();
    window.addEventListener(`resize`, calculationwidth, false);
    async function nextlevel() {
        window.addEventListener(`resize`, calculationwidth, false);
        const main = document.querySelector('.game-puzzle__main');
        main.innerHTML = '';
        await game.createPuzzle();
        buttonidont.classList.remove('game-puzzle__button_hidden');
        buttoncontinue.classList.add('game-puzzle__button_hidden');
        main.style.backgroundImage = 'none';
        calculationwidth();
    }

    function clickbuttonidont() {
        removechek();
        if (!buttonchek.classList.contains('game-puzzle__button_hidden'))
            buttonchek.classList.add('game-puzzle__button_hidden');
        const groupwords = document.querySelector('.group-words');
        const words = document.querySelector('.group-words').childNodes;
        sentence = document.querySelector('.game-puzzle__sentenceField_active');
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
    }

    function clickbuttoncontinue() {
        const main = document.querySelector('.game-puzzle__main');
        const puzle = document.querySelector('.group-words');
        game.sentencenumber += 1;
        if (game.sentencenumber === 11) {
            if (+game.Page.value < 10)
                game.Page.value = +game.Page.value + 1;
            else if (+game.Level.value < 6) game.Level.value = +game.Level.value + 1;
            else {
                game.Page.value = 1;
                game.Level.value = 1
            }
            nextlevel();
        } else if (game.sentencenumber === 10) {
            window.removeEventListener(`resize`, calculationwidth, false);
            main.innerHTML = '';
            const picture = game.levelimg[game.Level.value - 1][game.Page.value];
            puzle.innerHTML = `${picture.name} ${picture.author} ${picture.year}`;
            document.querySelector('#sentence').innerHTML = '';
            console.log(picture.cutSrc);
            main.style.backgroundImage = `url('${game.urlimg+picture.cutSrc}')`;
            main.style.backgroundSize = 'cover';
            buttonchek.classList.add('game-puzzle__button_hidden');

        } else {
            buttoncontinue.classList.add('game-puzzle__button_hidden');
            game.addsentence();
            buttonidont.classList.remove('game-puzzle__button_hidden');
            calculationwidth();
        }
    }
    buttoncontinue.addEventListener('click', clickbuttoncontinue);
    buttonidont.addEventListener('click', clickbuttonidont);

    buttonchek.addEventListener('click', () => {
        const sentence = document.querySelector('.game-puzzle__sentenceField_active');
        const words = sentence.children;
        removechek();
        let fail = false;
        const listElements = [...sentence.children];
        const listElementssort = listElements.sort((a, b) => parseInt((a.classList[2]).replace(/\D+/g, ""), 10) - parseInt((b.classList[2]).replace(/\D+/g, ""), 10));
        listElementssort.forEach((word, number) => {
            if (word.classList[2] === words[number].classList[2]) {

                words[number].classList.add('convas__bottom_green');
            } else {
                words[number].classList.add('convas__bottom_red');
                fail = true
            }
        });
        if (!fail) {
            clickbuttonidont();
            clickbuttoncontinue();
        }
    });
    game.Level.addEventListener("change", nextlevel);
    game.Page.addEventListener("change", nextlevel);
}