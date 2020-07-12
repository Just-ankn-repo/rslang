const englishquiz = {
    render: async() => {
        const view = /* html */ `
        <div class="game-quiz">
        <div class="game-quiz__startPage">
            <h2 class="game-quiz__heading">English Quiz</h2>
            <p class="game-quiz__text game-quiz__text_white">  
Collect word-picture pairs.<br> Do it fast. Good luck!</p>
            <button class="game-quiz__button game-quiz__button_start"> Start</button>
        </div>
        </div>`
        return view
    },
    after_render: async() => {

    }

}

export default englishquiz;