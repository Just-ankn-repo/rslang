export default class Results {
    constructor(elementgame, gameeErrors, gamelevel, gamepage) {
        this.results = [];
        this.gameeErrors = gameeErrors;
        this.gamelevel = gamelevel;
        this.gamepage = gamepage;
        this.elementgame = elementgame;
        this.errors = 0;
    }

    lodingresult() {
        if (!localStorage.getItem('game-puzzle'))
            localStorage.setItem('game-puzzle', '');
        else { this.results = localStorage.getItem('game-puzzle').split('*') }

    }

    saveresult() {
        const time = new Date();
        this.lodingresult();
        this.gameeErrors.forEach((el) => {
            if (el === false) this.errors += 1;
            else this.errors -= 1;
        });
        this.results.push(`${time.toDateString()} ${time.toTimeString().split(' ')[0]} Level:${this.gamelevel.value} Page:${this.gamepage.value} Errors:${this.errors} `);
        localStorage.setItem('game-puzzle', this.results.join('*'));
    }

    adddomresults() {
        this.lodingresult();
        const results = document.createElement('div');
        results.classList.add('game-quiz__results');
        results.innerHTML = this.results.join('<br>');
        this.elementgame.innerHTML = '';
        this.elementgame.append(results);
    }

}