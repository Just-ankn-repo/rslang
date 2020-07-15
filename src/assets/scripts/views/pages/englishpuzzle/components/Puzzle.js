import createCanvasElements from './canvas'

export default class Puzzle {
    constructor(level, page, urlImg, elementSentence, elementGame, translate) {
        this.level = level;
        this.page = page;
        this.words = [];
        this.convasElements = [];
        this.urlImg = urlImg;
        this.elementSentence = document.querySelector(`${elementSentence}`);;
        this.numberSentence = 0;
        this.translate = translate;
        this.elementGame = document.querySelector(`${elementGame}`);

    }

    async getConvasElements(urlImg, flag, number) {
        const temp = await createCanvasElements({
            imgflag: flag,
            src: urlImg,
            wordsList: [this.words[0].textExample, this.words[1].textExample, this.words[2].textExample, this.words[3].textExample,
                this.words[4].textExample, this.words[5].textExample, this.words[6].textExample, this.words[7].textExample,
                this.words[8].textExample, this.words[9].textExample
            ],
        }).then(res => {
            return res;
        })
        this.convasElements[number] = temp;
    }


    addDomSentence() {
        if (this.translate)
            this.elementSentence.innerHTML = this.words[this.numberSentence].textExampleTranslate;
        else this.elementSentence.innerHTML = this.words[this.numberSentence].textExample;
    }

    addDomSentencePuzzle(type, number) {
        this.elementGame.innerHTML = '';
        this.numberSentence = number;
        this.elementGame.append(this.convasElements[type][number]);
        this.mixConvasElements();
        this.addDomSentence();
    }

    async getwordsapi() {
        const url = `https://afternoon-falls-25894.herokuapp.com/words?page=${this.page}&group=${this.level-1}`;
        const res = await fetch(url);
        const data = await res.json();
        this.words = data;

    }

    mixConvasElements() {
        const convasElementschildren = this.convasElements[0][this.numberSentence].childNodes;
        const convasElementschildren2 = this.convasElements[1][this.numberSentence].childNodes;
        for (let i = 0; i < convasElementschildren.length; i += 1) {
            const rand1 = 0 + Math.random() * (1000 + 1);
            convasElementschildren[i].style.order = Math.floor(rand1);
            // eslint-disable-next-line no-use-before-define
            drag(convasElementschildren[i]);
            convasElementschildren2[i].style.order = Math.floor(rand1);
            // eslint-disable-next-line no-use-before-define
            drag(convasElementschildren2[i]);
        }
    }

    getwords(words) {

        this.words = words;
    }

    async loadPuzzle() {
        await this.getwordsapi();
        await this.getConvasElements(this.urlImg, true, 0);
        await this.getConvasElements(this.urlImg, false, 1);
        this.addDomSentencePuzzle(0, 0);
        this.mixConvasElements();


    }




}

function drag(convas) {
    const convaselement = convas;
    const clone = convaselement.cloneNode(true);
    clone.classList.add('convas__convasclone');

    function down() {
        // eslint-disable-next-line no-restricted-globals
        const shiftX = event.clientX - 8 - convaselement.getBoundingClientRect().left;
        // eslint-disable-next-line no-restricted-globals
        const shiftY = event.clientY - convaselement.getBoundingClientRect().top;
        const sentencefield = document.querySelector('.game-puzzle__sentenceField_active');
        const poz = sentencefield.getBoundingClientRect();
        let wordnumber = 0;
        let wordnumberchanged = false;
        convaselement.style.zIndex = 1000;
        document.body.append(convaselement);
        document.querySelector('.group-words').append(clone);
        // eslint-disable-next-line no-restricted-globals
        moveAt(event.pageX, event.pageY);

        convaselement.style.position = 'absolute';

        function moveAt(pageX, pageY) {

            convaselement.style.left = `${pageX - shiftX}px`;
            convaselement.style.top = `${pageY - shiftY}px`;
        }

        function onMouseMove(event) {
            moveAt(event.pageX, event.pageY);
            const words = sentencefield.childNodes;
            words.forEach((word, number) => {

                word.classList.remove('convas__leftactive');
                const pozishn = word.getBoundingClientRect();

                // eslint-disable-next-line no-restricted-globals
                if (poz.y + pageYOffset - poz.height < parseInt(convaselement.style.top, 10) && poz.y + pageYOffset + poz.height > parseInt(convaselement.style.top, 10) && poz.left - 30 < parseInt(convaselement.style.left, 10) && poz.left + 30 + poz.width > parseInt(convaselement.style.left, 10)) {

                    if (pozishn.left - pozishn.width / 3 < parseInt(convaselement.style.left, 10) && pozishn.left + pozishn.width / 2 > parseInt(convaselement.style.left, 10)) {
                        wordnumber = number;

                        wordnumberchanged = true;
                        word.classList.add('convas__leftactive');
                    }

                }
            });

        }
        document.addEventListener('mousemove', onMouseMove);
        convaselement.onmouseup = function() {

            // eslint-disable-next-line no-restricted-globals
            if (poz.y + pageYOffset - poz.height < parseInt(convaselement.style.top, 10) && poz.y + pageYOffset + poz.height > parseInt(convaselement.style.top, 10) && poz.left - 30 < parseInt(convaselement.style.left, 10) && poz.left + 30 + poz.width > parseInt(convaselement.style.left, 10)) {
                const words = sentencefield.childNodes;
                if (words.length !== 0 && wordnumberchanged && document.querySelector('.convas__leftactive')) {
                    words[wordnumber].before(convaselement);
                    wordnumberchanged = false;
                } else sentencefield.append(convaselement);
                convaselement.style.position = 'static';
                words.forEach((word) => {
                    word.classList.remove('convas__leftactive');
                });
                if (words.length !== 0 && words.length === document.querySelector('.group-words').childNodes.length)
                    document.querySelector('.game-puzzle__button_chek').classList.remove('game-puzzle__button_hidden');
                else { document.querySelector('.game-puzzle__button_chek').classList.add('game-puzzle__button_hidden'); }
            } else {
                clone.remove();
                document.querySelector('.group-words').append(convaselement);
                convaselement.style.position = 'static';
            }


            document.removeEventListener('mousemove', onMouseMove);

            convaselement.onmouseup = null;
        };

    };
    convaselement.ondragstart = function() {
        return false;
    };
    convaselement.onmousedown = down;
}