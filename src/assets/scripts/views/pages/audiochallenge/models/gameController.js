const view = {
    renderGame: ()=> {
        return `<div class="col-md-12 game-container">
        <div class="row justify-content-end">
        <div class="game-container__close"><span>&#215;</span></div>
        </div>
        <div class="row justify-content-center">
            <div class="game-container__speaker"></div>
        </div>
        <div class="row justify-content-center">
            <ul class="game-container__answers">
                <li><span class="number">1.</span><span class="answer">Слово</span></li>
                <li><span class="number">2.</span><span class="answer">Слово</span></li>
                <li><span class="number">3.</span><span class="answer">Слово</span></li>
                <li><span class="number">4.</span><span class="answer">Слово</span></li>
                <li><span class="number">5.</span><span class="answer">Слово</span></li>
            </ul>
        </div>

        <div class="row justify-content-center">
            <div class="btn-next"><span>I don't know</span></div>
        </div>
        </div>`;
    }
}

const model = {

}

const controller = {
    loadField: (parent)=> {
        setTimeout(() => {
            parent.innerHTML = view.renderGame();

        }, 4500);
    }
}

export default controller;
