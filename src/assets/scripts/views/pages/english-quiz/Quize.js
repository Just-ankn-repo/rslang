import Timer from './timer';
import Results from './Results'

class Quiz {
    constructor(elementgame, elementlevel, elementpage, elementsize, elementcomplexity, elementerrors) {
        this.elementgame = elementgame;
        this.elementlevel = elementlevel;
        this.elementpage = elementpage;
        this.elementsize = elementsize;
        this.elementcomplexity = elementcomplexity;
        this.elementerrors = elementerrors;
        this.words = '';
        this.page = 1;
        this.level = 1;
        this.size = 'normal';
        this.complexity = 'easy(7)';
        this.couplecards = [];
        this.numbercard = '';
        this.cardclicks = false;
        this.cardchek = document.createElement('div');
        this.error = 0;
        this.correctly = 0;
        this.timer = new Timer(document.querySelector('.timer'));
        this.result = '';


        this.url = 'https://raw.githubusercontent.com/ValeriaKorzhenevskaya/rslang-data/master/';
    }

    async getwordsapi() {
        const url = `https://afternoon-falls-25894.herokuapp.com/words?page=${this.page}&group=${this.level}`;
        const res = await fetch(url);
        const data = await res.json();
        this.words = data;
    }

    cardclick(card) {
        if (card.classList.contains('game-quiz__card_false'))
            card.classList.remove('game-quiz__card_false');
        if (this.cardclicks && card.classList[1] !== this.cardchek.classList[1]) {
            this.cardclicks = false;
            if (this.numbercard === +/\d+/.exec(card.classList[2])) {
                card.classList.add('game-quiz__card_true');
                this.correctly += 1;
                this.cardchek.classList.add('game-quiz__card_true');
                const cardtemp = this.cardchek;
                setTimeout(() => {
                    // eslint-disable-next-line no-param-reassign
                    card.style.opacity = 0;
                    cardtemp.style.opacity = 0
                }, 1000);
                if (this.correctly === this.couplecards.length / 2) {
                    this.result = new Results(this.elementgame, this.error, this.timer.stoptimer(), this.elementlevel.value, this.page);
                    this.result.saveresult();
                    this.elementgame.innerHTML = '<p class="game-quiz__main_text"> finished</p>';
                    document.querySelector('.game-quiz__button_continue').classList.remove('game-quiz__button_hiden');
                    document.querySelector('.game-quiz__button_help').classList.add('game-quiz__button_hiden');
                    document.querySelector('.game-quiz__button_results').classList.remove('game-quiz__button_hiden');
                }

            } else {
                setTimeout(() => {
                    card.classList.add('game-quiz__card_false');
                    this.cardchek.classList.add('game-quiz__card_false');
                    this.cardchek.classList.remove('game-quiz__card_active');
                }, 0);

                this.error += 1;
                this.elementerrors.innerHTML = `Error: ${this.error}`;
            }
        } else {
            if (this.cardchek.classList.contains('game-quiz__card_active'))
                this.cardchek.classList.remove('game-quiz__card_active');

            this.cardclicks = true;
            this.numbercard = +/\d+/.exec(card.classList[2]);
            this.cardchek = card;
            card.classList.add('game-quiz__card_active');

        }

    }

    addEventcard() {
        this.couplecards.forEach(card => {
            // eslint-disable-next-line no-shadow
            card.addEventListener('click', card => {
                if (card.target.parentElement.classList.contains('game-quiz__card'))
                    this.cardclick(card.target.parentElement);
                else this.cardclick(card.target);
            })
        });

    }

    shufflecards() {
        this.couplecards.sort(() => Math.random() - 0.5);

    }

    async changeparameters() {
        this.page = this.elementpage.value;
        this.level = this.elementlevel.value - 1;
        this.size = this.elementsize.value;
        this.complexity = this.elementcomplexity.value;
        await this.cardAddDom();
        // eslint-disable-next-line no-param-reassign
        document.querySelectorAll('.game-quiz__card').forEach(card => { card.style.backgroundColor = document.querySelector('.game-quiz__color1').value });
        // eslint-disable-next-line no-param-reassign
        document.querySelectorAll('.game-quiz__text').forEach(card => { card.style.color = document.querySelector('.game-quiz__color2').value });



    }

    addchangeparametersivent() {
        this.elementpage.addEventListener('change', () => this.changeparameters());
        this.elementlevel.addEventListener('change', () => this.changeparameters());
        this.elementcomplexity.addEventListener('change', () => this.changeparameters());
        this.elementsize.addEventListener('change', () => this.changeparameters());
    }

    createcards() {
        this.couplecards = [];
        this.words.forEach((word, number) => {
            const cardword = document.createElement('div');
            const textword = document.createElement('p');
            const cardimg = document.createElement('div');
            cardword.classList.add('game-quiz__card');
            cardword.classList.add('game-quiz__card_word')
            cardword.classList.add(`game-quiz__card${number}`)
            textword.classList.add('game-quiz__text');
            cardimg.classList.add(`game-quiz__card`);
            cardimg.classList.add(`game-quiz__card_img`);
            cardimg.classList.add(`game-quiz__card${number}`);
            textword.innerHTML = word.word;
            cardimg.style.backgroundImage = `url(${this.url+word.image})`;
            cardword.appendChild(textword);
            this.couplecards.push(cardword);
            this.couplecards.push(cardimg);
        });
    }

    async cardAddDom() {
        await this.getwordsapi();
        this.createcards();
        if (this.complexity === 'easy(7)')
            this.couplecards.length = 14;
        if (this.complexity === 'normal(13)')
            this.couplecards.length = 26;
        this.shufflecards();
        this.elementgame.innerHTML = '';
        this.couplecards.forEach((card) => { this.elementgame.appendChild(card) });
        if (this.size === 'normal')
            this.couplecards.forEach(card => card.classList.add('game-quiz__card_normal'));
        if (this.size === 'big')
            this.couplecards.forEach(card => card.classList.add('game-quiz__card_big'));

    }
}
export default async function Gamestart() {
    const main = document.querySelector('.game-quiz__main');
    const selectlevel = document.querySelector('.game-quiz__select_level');
    const selectpage = document.querySelector('.game-quiz__select_page');
    const selectsize = document.querySelector('.game-quiz__select_size');
    const selectcomplexity = document.querySelector('.game-quiz__select_complexity');
    const buttonstartgame = document.querySelector('.game-quiz__button_startgame');
    const buttonhelp = document.querySelector('.game-quiz__button_help');
    const buttoncontinue = document.querySelector('.game-quiz__button_continue');
    const inputcolor1 = document.querySelector('.game-quiz__color1');
    const inputcolor2 = document.querySelector('.game-quiz__color2');
    const panelgame = document.querySelector('.game-quiz__panel_game');
    const errors = document.querySelector('.game-quiz__text_errors');
    const buttonstart = document.querySelector('.game-quiz__button_start');
    const buttonresults = document.querySelector('.game-quiz__button_results');
    inputcolor1.addEventListener('change', () => {
        // eslint-disable-next-line no-param-reassign
        document.querySelectorAll('.game-quiz__card').forEach(card => { card.style.backgroundColor = inputcolor1.value });
        // eslint-disable-next-line no-param-reassign
        document.querySelectorAll('.game-quiz__panel').forEach(card => { card.style.backgroundColor = inputcolor1.value });
    });
    inputcolor2.addEventListener('change', () => {
        // eslint-disable-next-line no-param-reassign
        document.querySelectorAll('.game-quiz__text').forEach(card => { card.style.color = inputcolor2.value });

    });
    const quiz = new Quiz(main, selectlevel, selectpage, selectsize, selectcomplexity, errors);
    quiz.addchangeparametersivent();
    quiz.cardAddDom();
    buttonstartgame.addEventListener('click', () => {
        quiz.addEventcard();
        quiz.timer.starttimer();
        document.querySelectorAll('.game-quiz__panel_settings').forEach(el => el.classList.add('game-quiz__panel_hiden'));
        buttonstartgame.classList.add('game-quiz__button_hiden');
        panelgame.classList.remove('game-quiz__panel_hiden');
        quiz.correctly = 0;
        quiz.error = 0;
        quiz.elementerrors.innerHTML = 'Errors:0'
        buttonhelp.classList.remove('game-quiz__button_hiden');
    });
    buttoncontinue.addEventListener('click', () => {
        document.querySelectorAll('.game-quiz__panel_settings').forEach(el => el.classList.remove('game-quiz__panel_hiden'));
        buttonstartgame.classList.remove('game-quiz__button_hiden');
        panelgame.classList.add('game-quiz__panel_hiden');
        if (+quiz.elementpage.value < 10)
            quiz.elementpage.value = +quiz.elementpage.value + 1;
        else if (+quiz.elementlevel.value < 6) quiz.elementlevel.value = +quiz.elementlevel.value + 1;
        else {
            quiz.elementpage.value = 1;
            quiz.elementlevel.value = 1
        }
        quiz.changeparameters();
        buttoncontinue.classList.add('game-quiz__button_hiden');
        document.querySelector('.game-quiz__button_results').classList.add('game-quiz__button_hiden');
    })



    function buttonhelpclick() {
        const cards = document.querySelectorAll('.game-quiz__card');
        let tempcard = false;
        cards.forEach((card) => {
            if (!card.classList.contains('game-quiz__card_true') && !tempcard) {
                tempcard = card;
            }
            if (tempcard && +/\d+/.exec(card.classList[2]) === +/\d+/.exec(tempcard.classList[2])) {
                tempcard.classList.add('game-quiz__card_help');
                card.classList.add('game-quiz__card_help');
            }
        })

    }
    buttonhelp.addEventListener('click', buttonhelpclick);
    buttonstart.addEventListener('click', () => {

        document.querySelector('.game-quiz__startPage').style.display = `none`
    });
    buttonresults.addEventListener('click', () => {
        quiz.result.adddomresults()
        buttonresults.classList.add('game-quiz__button_hiden');
    })
}