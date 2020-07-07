import {loadSprint, renderLoad} from './models/loaderGame';
import controller from './models/mainGame';
import words from "./models/constants";
import {stopTimer} from './models/timer';


const sprintGame = {
    render: async () => {
        return `
      <div class="row justify-content-between align-content-center row-wrapper">
      <div class="col-md-12">
      <div class="start-field">
      <div class="start-field__info">
        <div class="select-field">
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
            <span class="level my-1 mr-sm-2">
                <input id="numLevel" type="number" min="1" max="30" value="1">
                <span onclick="this.previousElementSibling.stepUp()"></span>
                <span onclick="this.previousElementSibling.previousElementSibling.stepDown()"></span>
            </span>
            </form>
        </div>
        <span class="start-field__title">Sprint</span>
        <div class="start-field__logo"></div>
        <span class="start-field__text"> The game Sprint will teach you to quickly translate from English into your native language.</span>
        <button id="btnStart" class="btn btn-success">Start</button>  
        </div> 
      </div>
      </div>
     </div>
        `
    },

    after_render: async () => {
        document.getElementById('btnStart').addEventListener('click', ()=> {
            let wrapper =   document.querySelector('.row-wrapper');
            let level = wrapper.querySelector('#numLevel');
            let difficulty = wrapper.querySelector('.custom-select');
            if(level.value>30) {
                level.value=30;
            }else if(level.value<1) {
                level.value=1;
            }
            stopTimer();
            renderLoad(wrapper);
            loadSprint();
            controller.loadField(wrapper, level.value, difficulty.options[difficulty.value].text);
            controller.loadWord(difficulty.value,level.value-1);
        });

    }
}



export default sprintGame;
