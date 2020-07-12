export function renderLoad(element) {
    element.innerHTML = ` <div class="loader-container">
                                    <button class="btn btn-danger" type="button" disabled>
                                        <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                                        <span class="loader-container__text">Get ready!</span>
                                    </button>
                                        <div class="guide">
                                        <ul>
                                        <li><div class="success"></div><span> - Every 3 correct answers increases the gain of points!</span></li>
                                        <li><div class="error"></div><span> - Wrong answer resets points gain!</span></li>
                                        </ul>
                                        <span class="info-key">For a quick answer, use the arrows on the keyboard</span>
                                        <div class="guide__keys">
                                            <kbd>&#129044;</kbd>
                                            <kbd>&#129046;</kbd>
                                        </div>
                                    </div>
                                  </div>`;
}

export function loadSprint() {
    const loaderContainer = document.querySelector('.loader-container');
    const spinner = loaderContainer.querySelector('.btn');
    const spinnerText = spinner.querySelector('.loader-container__text');

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
