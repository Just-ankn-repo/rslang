import controller from './mainGame';

let timerCount;
let totalTime = 60;
let count;


function update(percent) {
    let deg;
    if (percent < (totalTime / 2)) {
        deg = 90 + (360 * percent / totalTime);
        document.getElementById('pie').style.backgroundImage =
            'linear-gradient(' + deg + 'deg, transparent 50%, white 50%),linear-gradient(90deg, white 50%, transparent 50%)';
    } else if (percent >= (totalTime / 2)) {
        deg = -90 + (360 * percent / totalTime);
        document.getElementById('pie') !== null ? document.getElementById('pie').style.backgroundImage =
            'linear-gradient(' + deg + 'deg, transparent 50%, #4caf50 50%),linear-gradient(90deg, white 50%, transparent 50%)' : false;
    }
}

export function startTimer(parent) {
    count = parseInt(parent.querySelector('#time').innerText);
    timerCount = setInterval(function () {
        count -= 1;
        parent.querySelector('#time').innerText = count;
        update(count);

        if (count == 0) {
            clearInterval(timerCount);
            controller.loadStatistic(parent);
        }
    }, 1000);
}

export function stopTimer() {
    clearInterval(timerCount);
}

