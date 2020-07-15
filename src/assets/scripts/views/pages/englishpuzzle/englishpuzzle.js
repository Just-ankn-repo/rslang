import Code from './components/main';

const Englishpuzzle = {
    render: async() => {
        const view = /* html */ `
        <div class="game-puzzle">
        <div class="game-puzzle__startPage">
            <h2 class="game-puzzle__heading">EnglishPuzzle</h2>
            <p class="game-puzzle__text game-puzzle__text_white">Click on words, collect phrases. <br>Words can be drag and drop. Select tooltips in the menu</p>
            <button class="game-puzzle__button game-puzzle__start"> Start</button>
        </div>
        <div class="game-puzzle__wrapper">
            <div class="game-puzzle__bars">
                <div class="game-puzzle__level-bar bar">
                    <p class="game-puzzle__text">Level</p>
                    <select class="game-puzzle__select game-puzzle__select_level">
                <option class="game-puzzle__option">1</option>
                <option class="game-puzzle__option">2</option>
                <option class="game-puzzle__option">3</option>
                <option class="game-puzzle__option">4</option>
                <option class="game-puzzle__option">5</option>
                <option class="game-puzzle__option">6</option>
              </select>
              
                    <p class="game-puzzle__text">Page</p>
                    <select class="game-puzzle__select game-puzzle__select_page">
                <option class="game-puzzle__option">1</option>
                <option class="game-puzzle__option">2</option>
                <option class="game-puzzle__option">3</option>
                <option class="game-puzzle__option">4</option>
                <option class="game-puzzle__option">5</option>
                <option class="game-puzzle__option">6</option>
                <option class="game-puzzle__option">7</option>
                <option class="game-puzzle__option">8</option>
                <option class="game-puzzle__option">9</option>
                <option class="game-puzzle__option">10</option>
              </select>

                </div>
                <div class="game-puzzle__button-bar bar">
                    <button class="game-puzzle__button game-puzzle__button_transfer"></button>
                    <button class="game-puzzle__button game-puzzle__button_sound"></button>
                    <button class="game-puzzle__button game-puzzle__button_sound_auto"></button>
                    <button class="game-puzzle__button game-puzzle__button_puzzle-img"></button>
                </div>
            </div>
            <div class="game-puzzle__sentence-bar">
                <button class="game-puzzle__button game-puzzle__button_active game-puzzle__button_puzzle-sound-play"></button>
                <p class="game-puzzle__text" id="sentence"></p>
            </div>
            <div class="game-puzzle__playground">

                <div class="game-puzzle__main"></div>
                <div class="game-puzzle__puzzle" id="table"></div>
                <div class="game-puzzle__buttonbar bar">
            <button class="game-puzzle__button game-puzzle__button_active game-puzzle__button_long  game-puzzle__button_idont">I dont know</button>
            <button class="game-puzzle__button game-puzzle__button_active game-puzzle__button_long  game-puzzle__button_hidden game-puzzle__button_chek">Check</button>
            <button class="game-puzzle__button game-puzzle__button_active game-puzzle__button_long game-puzzle__button_hidden game-puzzle__button_continue">Continue</button>
            <button class="game-puzzle__button game-puzzle__button_active game-puzzle__button_long game-puzzle__button_hidden game-puzzle__button_results">Results</button>
            </div>
                
            </div>
           
        </div>
    </div>
        `
        return view
    },
    after_render: async() => {
        Code();
    }

}

// eslint-disable-next-line camelcase
export default Englishpuzzle;