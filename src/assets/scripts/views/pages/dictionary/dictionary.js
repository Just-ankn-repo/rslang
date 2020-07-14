// import generateContainer from "./Container";
// import checkbox from "./Checkbox";
import items from "./Constants";
import Control from "./Control";

const Dictionary = {
  render : async () => {
      const view =  /* html */`
        <div class="dictionary" style="font-size: 14px;">
            <div class="wrapper">
                <div class="dictionary-control">
                    <h1 class="dictionary-control__heading">Словарь</h1>
                    <button class="learn-button learn-more">
                        <span class="learn-button_circle" aria-hidden="true">
                        <span class="icon arrow"></span>
                        </span>
                        <span class="button-text">Новые слова</span>
                    </button>
                </div>

                <div class="dictionary-tools">
                        <p class='dictionary-tools__checkbox_text'>
                            <input class="dictionary-tools__checkbox" id="checkAll" type="checkbox">
                        </p>
                        <input type="text" placeholder="Найти" class="dictionary-tools__search">
                        <div class="dictionary-tools__compact-btn"></div>
                        <div class="dictionary-tools__sorting">
                            <object title="Все слова" class="dictionary-tools__sorting_all"></object>
                            <object title="Легко" class="dictionary-tools__sorting_new"></object>
                            <object title="Средне" class="dictionary-tools__sorting_studying"></object>
                            <object title="Сложно" class="dictionary-tools__sorting_studied"></object>
                        </div>
                </div>

                <div class="dictionary-modal">
                    
                    <div class="dictionary-modal__close-button"></div>

                    <div class="dictionary-card">
                        <img src="" class="dictionary-card__image">
                        <div class="dictionary-card__transcription"><object class="dictionary-card__audio-icon"></object></div>
                        <div class="dictionary-card__word"></div>
                        <div class="dictionary-card__translation"></div>
                        <div class="dictionary-card__example"></div>
                        <object class="dictionary-card__trash"></object>
                    </div>

                    
                </div>

                <div id="content"></div>
            </div>


        </div>
      `
      return view
  },    
  
  after_render: async () => {
      const control = new Control;
      control.getItems(items);
  }   
}

export default Dictionary;