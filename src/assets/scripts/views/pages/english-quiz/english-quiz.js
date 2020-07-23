import Quize from './Quize';

const englishquiz = {
    render: async() => {
        const view = /* html */ `
    <div class="game-quiz">
        <div class="game-quiz__startPage">
        <h2 class="game-quiz__heading">English Quiz</h2>
        <p class="game-quiz__text game-quiz__text_white">Collect word-picture pairs.<br> Do it fast. Good luck!</p>
        <button class="game-quiz__button game-quiz__button_start"> Start</button>
        </div>
        <div class="game-quiz__header">
            <div class="game-quiz__panel game-quiz__panel_settings">
                <p class="game-quiz__text">Level</p>
                <select class="game-quiz__select game-quiz__select_level">
                    <option class="game-quiz__option">1</option>
                    <option class="game-quiz__option">2</option>
                    <option class="game-quiz__option">3</option>
                    <option class="game-quiz__option">4</option>
                    <option class="game-quiz__option">5</option>
                    <option class="game-quiz__option">6</option>
                  </select>
                <p class="game-quiz__text">Page</p>
                <select class="game-quiz__select game-quiz__select_page">
                    <option class="game-quiz__option">1</option>
                    <option class="game-quiz__option">2</option>
                    <option class="game-quiz__option">3</option>
                    <option class="game-quiz__option">4</option>
                    <option class="game-quiz__option">5</option>
                    <option class="game-quiz__option">6</option>
                    <option class="game-quiz__option">7</option>
                    <option class="game-quiz__option">8</option>
                    <option class="game-quiz__option">9</option>
                    <option class="game-quiz__option">10</option>
                  </select>

            </div>
            <div class="game-quiz__panel game-quiz__panel_settings">
                <p><input class="game-quiz__color1" type="color" list="colorList" value="#4a86e8"></p>
                <p class="game-quiz__text">Color</p>
                <p><input class="game-quiz__color2" type="color" list="colorList"></p>
            </div>
            <div class="game-quiz__panel game-quiz__panel_settings">
                <p class="game-quiz__text">Size</p>
                <select class="game-quiz__select game-quiz__select_size ">
                    <option class="game-quiz__option">small</option>
                    <option class="game-quiz__option" selected>normal</option>
                    <option class="game-quiz__option">big</option>
                  </select>
                <p class="game-quiz__text">Complexity</p>
                <select class="game-quiz__select game-quiz__select_complexity">
                      <option class="game-quiz__option">easy(7)</option>
                      <option class="game-quiz__option">normal(13)</option>
                      <option class="game-quiz__option">hard(20)</option>
                    </select> </div>
            <div class="game-quiz__panel game-quiz__panel_game  game-quiz__panel_hiden">
                <p class="game-quiz__text">Time:</p>
                <p class="game-quiz__text timer"> </p>
                <p class="game-quiz__text game-quiz__text_errors">Errors:0</p>
            </div>
        </div>
        <div class="game-quiz__main">
        </div>
        <div class="game-quiz__panel"><button class="game-quiz__button game-quiz__button_startgame">Start game</button>
            <button class="game-quiz__button game-quiz__button_continue game-quiz__button_hiden">Continue</button>
            <button class="game-quiz__button game-quiz__button_results game-quiz__button_hiden">Results</button>
            <button class="game-quiz__button game-quiz__button_help game-quiz__button_hiden"></button>
        </div>
        
    </div>
      `
        return view
    },
    after_render: async() => {
        Quize();
    }

}

export default englishquiz;