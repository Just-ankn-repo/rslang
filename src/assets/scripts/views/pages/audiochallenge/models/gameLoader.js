export function renderLoad(element) {
    element.innerHTML = ` <div class="loader-game">
                                    <button class="btn btn-danger" type="button" disabled>
                                        <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                                        <span class="loader-game__text">Get ready!</span>
                                    </button>
                                        <div class="loader-game__guide">Use the <kbd>1</kbd><kbd>2</kbd><kbd>3</kbd><kbd>4</kbd><kbd>5</kbd> to select the correct answer.</div>
                                        <span class="loader-game__guide">To go to the next word, use the <kbd>Enter</kbd></span>
                                    </div>`;
}

export function loadGame() {
    const loaderContainer = document.querySelector('.loader-game');
    const spinner = loaderContainer.querySelector('.btn');
    const spinnerText = spinner.querySelector('.loader-game__text');

    loaderContainer.style.display = 'default';
    setTimeout(() => {
        spinner.classList.remove('btn-danger');
        spinner.classList.add('btn-warning');
        spinnerText.textContent = 'Ready?';
    }, 1500);
    setTimeout(() => {
        spinner.classList.remove('btn-warning');
        spinner.classList.add('btn-success');
        spinnerText.textContent = 'Good Luck!';
    }, 3000);
}