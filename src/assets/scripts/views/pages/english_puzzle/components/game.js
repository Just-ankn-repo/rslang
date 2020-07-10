import imagelevel1 from './level1';
import imagelevel2 from './level2';
import imagelevel3 from './level3';
import imagelevel4 from './level4';
import imagelevel5 from './level5';
import imagelevel6 from './level6';
import Puzzle from './Puzzle';

export default class GameMechanics {
    constructor(elementLevel, elementPage, elementPlayingField) {
        this.levelimg = [imagelevel1, imagelevel2, imagelevel3, imagelevel4, imagelevel5, imagelevel6];
        this.puzzle = new Puzzle();
        this.Level = elementLevel;
        this.Page = elementPage;
        this.elementPlayingField = elementPlayingField;
        this.urlimg = 'https://english-puzzle-data-team61.team61.vercel.app/';
        this.sentencenumber = 0;
        this.sentetype = 1;
        this.answers = [];
        this.soundauto = false;
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