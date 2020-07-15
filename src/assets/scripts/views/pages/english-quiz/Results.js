 export default class Results {
     constructor(elementgame, gameeErrors, gametime, gamelevel, gamepage) {
         this.results = [];
         this.gameeErrors = gameeErrors;
         this.gamatime = gametime;
         this.gamelevel = gamelevel;
         this.gamepage = gamepage;
         this.elementgame = elementgame;
     }

     lodingresult() {
         if (!localStorage.getItem('game-quiz'))
             localStorage.setItem('game-quiz', '');
         else { this.results = localStorage.getItem('game-quiz').split('*') }

     }

     saveresult() {
         const time = new Date();
         this.lodingresult();
         this.results.push(`${time.toDateString()} ${time.toTimeString().split(' ')[0]} Time:${this.gamatime}s Level:${this.gamelevel} Page:${this.gamepage} Errors:${this.gameeErrors} `);
         localStorage.setItem('game-quiz', this.results.join('*'));
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