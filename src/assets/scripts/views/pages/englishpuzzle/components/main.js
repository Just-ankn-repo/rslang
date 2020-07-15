import gallery from '../../../../../static/images/englishPuzzle/icon/gallery.png'
import speakernotes from '../../../../../static/images/englishPuzzle/icon/speaker-notes.png'
import musicalnotes from '../../../../../static/images/englishPuzzle/icon/musical-notes.png'
import roomsound from '../../../../../static/images/englishPuzzle/icon/room-sound.png'
import GameMechanics from './game'
import Results from './Results'



function buttonclick(buttonelement, url, urloff) {
    if (buttonelement.target.classList.contains('game-puzzle__button_active')) {
        // eslint-disable-next-line no-param-reassign
        buttonelement.target.style.backgroundImage = `url('${urloff}')`;
        buttonelement.target.classList.remove('game-puzzle__button_active');
    } else {
        // eslint-disable-next-line no-param-reassign
        buttonelement.target.style.backgroundImage = `url('${url}')`;
        buttonelement.target.classList.add('game-puzzle__button_active');
    }
}
const sortListById = (list) => {
    const listElements = [...list.children]
    const listElementssort = listElements.sort((a, b) => parseInt((a.classList[2]).replace(/\D+/g, ""), 10) - parseInt((b.classList[2]).replace(/\D+/g, ""), 10));
    // eslint-disable-next-line no-param-reassign
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
        document.querySelector('.game-puzzle__wrapper').style.display = 'block';
        // eslint-disable-next-line no-undef

        setTimeout(() => { document.querySelector('.game-puzzle__startPage').style.display = `none` }, 500);
    });



}
export default async function def() {
    buttonaddevent();
    const buttonsoundpaly = document.querySelector('.game-puzzle__button_puzzle-sound-play');
    const buttonidont = document.querySelector('.game-puzzle__button_idont');
    const buttonchek = document.querySelector('.game-puzzle__button_chek');
    const buttoncontinue = document.querySelector('.game-puzzle__button_continue');
    let sentence = document.querySelector('.game-puzzle__sentenceField_active');
    const buttonimg = document.querySelector('.game-puzzle__button_puzzle-img');
    const buttonresults = document.querySelector('.game-puzzle__button_results');
    const buttontransfer = document.querySelector('.game-puzzle__button_transfer');
    const buttonsoundauto = document.querySelector('.game-puzzle__button_sound_auto');
    const game = new GameMechanics(document.querySelector('.game-puzzle__select_level'), document.querySelector('.game-puzzle__select_page'), document.querySelector('.game-puzzle__main'));
    let results = new Results();
    await game.createPuzzle();
    const buttonstart = document.querySelector('.game-puzzle__start');

    function calculationwidth() { if (document.querySelector('.game-puzzle__main')) document.querySelector('.game-puzzle__main').style.width = `${document.querySelector('.group-words').offsetWidth + 40}px`; }
    calculationwidth();
    buttonstart.addEventListener('click', () => { calculationwidth(); });
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
            // eslint-disable-next-line no-param-reassign
            word.onmousedown = () => {};
            const clone = word.cloneNode(true);
            groupwords.append(clone);
        });
        buttonidont.classList.add('game-puzzle__button_hidden');
        buttoncontinue.classList.remove('game-puzzle__button_hidden');
        sentence.classList.remove('game-puzzle__sentenceField_active');
    }

    function speak() {
        const msg = new SpeechSynthesisUtterance(document.querySelector('#sentence').innerHTML);
        msg.voiceURI = 'native';
        if (game.puzzle.translate)
            msg.lang = 'ru-RU';
        else
            msg.lang = 'en-EN';

        speechSynthesis.speak(msg);
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
            buttoncontinue.classList.add('game-puzzle__button_hidden')
            nextlevel();
            buttonresults.classList.add('game-puzzle__button_hidden');
        } else if (game.sentencenumber === 10) {

            game.answers.push(false);
            buttonresults.classList.remove('game-puzzle__button_hidden');
            window.removeEventListener(`resize`, calculationwidth, false);
            main.innerHTML = '';
            const picture = game.levelimg[game.Level.value - 1][game.Page.value];
            puzle.innerHTML = `${picture.name} ${picture.author} ${picture.year}`;
            document.querySelector('#sentence').innerHTML = '';

            main.style.backgroundImage = `url('${game.urlimg+picture.cutSrc}')`;
            main.style.backgroundSize = 'cover';
            buttonchek.classList.add('game-puzzle__button_hidden');
            results = new Results(game.elementPlayingField, game.answers, game.Level, game.Page);
            results.saveresult();

            game.answers = [];

        } else {
            game.answers.push(false);
            buttoncontinue.classList.add('game-puzzle__button_hidden');
            game.addsentence();
            buttonidont.classList.remove('game-puzzle__button_hidden');
            calculationwidth();
            if (game.soundauto)
                speak();
        }
    }
    buttoncontinue.addEventListener('click', clickbuttoncontinue);
    buttonidont.addEventListener('click', clickbuttonidont);
    buttontransfer.addEventListener('click', () => {
        if (game.puzzle.translate)
            game.puzzle.translate = false;
        else game.puzzle.translate = true;
        game.puzzle.addDomSentence();

    });
    buttonchek.addEventListener('click', () => {
        sentence = document.querySelector('.game-puzzle__sentenceField_active');
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
                fail = true;
            }
        });
        if (!fail) {
            clickbuttonidont();
            game.answers[game.sentencenumber] = true;
            clickbuttoncontinue();

        }
    });
    buttonsoundauto.addEventListener('click', () => {
        if (buttonsoundauto.classList.contains('game-puzzle__button_active'))
            game.soundauto = true;
        else game.soundauto = false;

    })
    buttonimg.addEventListener('click', () => {

        if (buttonimg.classList.contains('game-puzzle__button_active'))
            game.sentetype = 0;
        else game.sentetype = 1;
    });
    game.Level.addEventListener("change", nextlevel);
    game.Page.addEventListener("change", nextlevel);
    buttonsoundpaly.addEventListener('click', speak);
    buttonresults.addEventListener('click', () => {
        results.adddomresults();
        buttonresults.classList.add('game-puzzle__button_hidden');
    });

}