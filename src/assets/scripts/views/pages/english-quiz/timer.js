export default class Timer {
    constructor(elementtimer) {
        this.elementtimer = elementtimer;
        this.seconds = 0;
        this.timerId = 0;

    }

    starttimer() {

        this.elementtimer.innerHTML = '0.0';
        this.seconds = 0;
        this.timerId = setInterval(() => { this.timertick() }, 100);

    }

    timertick() {

        const time = this.elementtimer.innerHTML.split('.');
        if (+time[1] === 9) {
            time[0] = +time[0] + 1;
            time[1] = 0;

        } else {
            time[1] = +time[1] + 1;
        }
        this.elementtimer.innerHTML = `${time[0]}.${time[1]}`;

    }

    stoptimer() { clearInterval(this.timerId); return this.elementtimer.innerHTML };
}