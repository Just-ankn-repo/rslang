import {loadGame, renderLoad} from './models/gameLoader';
import controller from './models/gameController';

const audioChallengeGame = {
    render: async () => {
        return `
          <div class="row justify-content-between align-content-center wrapper">
      <div class="col-md-12">
      <div class="intro-field">
      <div class="intro-field__info">
        <div class="setting-field">
            <form class="form-inline">
            <label class="my-1 mr-2" for="inlineFormCustomSelectPref">Game difficulty:</label>
            <select class="custom-select my-1 mr-sm-2" id="inlineFormCustomSelectPref">
              <option value="0" selected>Beginner</option>
              <option value="1">Elementary</option>
              <option value="2">Pre-Intermediate</option>
              <option value="3">Intermediate</option>
              <option value="4">Upper-Intermediate</option>
              <option value="5">Advanced</option>     
            </select>
            <label class="my-1 mr-2" for="inlineFormCustomSelectPref">Level:</label>
            <span class="game-level my-1 mr-sm-2">
                <input id="numLevel" type="number" min="1" max="30" value="1">
                <span onclick="this.previousElementSibling.stepUp()"></span>
                <span onclick="this.previousElementSibling.previousElementSibling.stepDown()"></span>
            </span>
            </form>
        </div>
        <span class="intro-field__title">Audiochallenge</span>
        <div class="intro-field__logo">
<svg class="loud-size" version="1.1" WIDTH="300" HEIGHT="300" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
\t viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">

<style>
  .loud-path-1{
        animation-name: fillPath;
        animation-duration: 3s;
        animation-timing-function: ease;
        animation-iteration-count: infinite;
  } 
  .loud-path-2{
        animation-name: fillPath;
        animation-duration: 3s;
        animation-timing-function: ease;
        animation-iteration-count: infinite;
  } 
  .loud-path-3{
        animation-name: fillPath;
        animation-duration: 3s;
        animation-timing-function: ease;
        animation-iteration-count: infinite;
  } 
  
  @keyframes fillPath {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
  } 
</style>
<circle style="fill:#FFD400;" cx="256" cy="256" r="256"/>
<path style="fill:#FF9F00;" d="M511.686,268.679L406.033,163.026l-6.712,4.529L308.32,75L75,330.097l181.891,181.891
\tC393.617,511.521,505.091,403.879,511.686,268.679z"/>
<polygon style="fill:#444444;" points="203.114,229.628 201.629,256.142 199.72,292.412 166.985,330.097 75,330.097 75,181.904 
\t166.773,181.904 166.985,181.691 "/>
<polygon style="fill:#292929;" points="201.629,256.142 199.72,292.412 166.985,330.097 75,330.097 75,256.142 "/>
<g>
\t<path class="loud-path-1" style="fill:#00ABE9;" d="M352.156,256.142c0,13.575-4.03,27.149-11.878,38.815l-17.816-11.666
\t\tc5.515-8.271,8.273-17.816,8.273-27.149c0-9.333-2.758-18.878-8.273-27.151l17.816-11.666
\t\tC348.126,228.991,352.156,242.567,352.156,256.142z"/>
\t<path class="loud-path-2"  style="fill:#00ABE9;" d="M437,256.142c0,29.907-8.908,59.815-26.301,85.904l-4.666,7.212l-17.605-11.879l4.666-6.999
\t\tc15.06-22.484,22.696-48.362,22.696-74.238c0-25.878-7.636-51.755-22.696-74.238l-4.666-7l17.605-11.878l4.666,7.212
\t\tC428.092,196.327,437,226.234,437,256.142z"/>
\t<path class="loud-path-3"  style="fill:#00ABE9;" d="M394.367,256.142c0,21.634-6.152,43.27-18.878,62.36l-4.667,7.211l-17.816-11.878l4.878-6.999
\t\tc10.181-15.485,15.273-33.09,15.273-50.694c0-17.605-5.092-35.211-15.273-50.694l-4.878-7l17.816-11.878l4.667,7.212
\t\tC388.215,212.871,394.367,234.506,394.367,256.142z"/>
</g>
<polygon style="fill:#5A5A5A;" points="308.32,75 308.32,437 166.985,330.097 166.985,181.691 "/>
<polygon style="fill:#444444;" points="166.985,256.142 308.32,256.142 308.32,437 166.985,330.097 "/>
<g>
\t<path class="loud-path-1" style="fill:#0095FF;" d="M330.734,256.142h21.422c0,13.575-4.03,27.149-11.878,38.815l-17.816-11.666
\t\tC327.977,275.02,330.734,265.475,330.734,256.142z"/>
\t<path class="loud-path-2" style="fill:#0095FF;" d="M394.367,256.142c0,21.634-6.152,43.27-18.878,62.36l-4.667,7.211l-17.816-11.878l4.878-6.999
\t\tc10.181-15.485,15.273-33.09,15.273-50.694L394.367,256.142L394.367,256.142z"/>
\t<path class="loud-path-3" style="fill:#0095FF;" d="M437,256.142c0,29.907-8.908,59.815-26.301,85.904l-4.666,7.212l-17.605-11.879l4.666-6.999
\t\tc15.06-22.484,22.696-48.362,22.696-74.238H437z"/>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
<g>
</g>
</svg>
        </div>
        <span class="intro-field__text"> The game improves the perception of speech by ear.</span>
        <div class="intro-field__button">
        <button id="btnStart" class="btn btn-success">Start</button>  
        </div>
        </div>
      </div>
      </div>
     </div>
        `
    },

    after_render: async () => {
        document.getElementById('btnStart').addEventListener('click', ()=> {
            let wrapper =   document.querySelector('.wrapper');
            renderLoad(wrapper);
            loadGame(wrapper);
            controller.loadField(wrapper);
        });
    }
}

export default audioChallengeGame;
