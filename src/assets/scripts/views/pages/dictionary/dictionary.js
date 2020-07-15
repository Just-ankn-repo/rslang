import backend from "../../../backend";
import getItems from './Control';

const Dictionary = {
  render : async () => {
      const view =  /* html */`
        <div class="dictionary" style="font-size: 14px;">
            <div class="wrapper">
                <div class="dictionary-control">
                    <h1 class="dictionary-control__heading">Dictionary</h1>
                    <button class="learn-button learn-more">
                        <a href="/#/learn-words">
                            <span class="learn-button_circle" aria-hidden="true">
                                <span class="icon arrow"></span>
                            </span>
                            <span class="button-text">Новые слова</span>
                        </a>
                    </button>
                </div>

                <div class="dictionary-tools">
                        <p class='dictionary-tools__checkbox_text'>
                            <input class="dictionary-tools__checkbox" id="checkAll" type="checkbox">
                        </p>
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
                    </div>

                    
                </div>

                <div id="content"></div>
            </div>


        </div>
      `
      return view
  },    
  
  after_render: async () => {
    const words = await backend.getUsersAggregatedWordsWithFilters({
        wordsPerPage: 1,
        filter: {
          "userWord": {
            "$exists" : true
          }
        }
    })
    const wordCount = words[0].totalCount[0].count;
    const allUsersWords = await backend.getUsersAggregatedWordsWithFilters({
        wordsPerPage: wordCount,
        filter: {
          "userWord": {
            "$exists" : true
          }
        }
    })
    const easyWords = await backend.getUsersAggregatedWordsWithFilters({
        wordsPerPage: wordCount,
        filter: {"userWord.difficulty":"easy"}
    })
    const normalWords = await backend.getUsersAggregatedWordsWithFilters({
        wordsPerPage: wordCount,
        filter: {"userWord.difficulty":"normal"}
    })
    const hardWords = await backend.getUsersAggregatedWordsWithFilters({
        wordsPerPage: wordCount,
        filter: {"userWord.difficulty":"hard"}
    })
      getItems(allUsersWords);
      document.querySelector('.dictionary-tools__sorting_all').addEventListener('click', () => {
        getItems(allUsersWords);
      })
      document.querySelector('.dictionary-tools__sorting_new').addEventListener('click', () => {
        getItems(easyWords);
      })
      document.querySelector('.dictionary-tools__sorting_studying').addEventListener('click', () => {
        getItems(normalWords);
      })
      document.querySelector('.dictionary-tools__sorting_studied').addEventListener('click', () => {
        getItems(hardWords);
      })
      document.querySelectorAll('.dictionary-element').forEach(elem => {
        elem.addEventListener('click', (e) => {
          if (e.target.classList.contains('dictionary-element__trash')) {
            elem.classList.add('deleted');
            elem.parentNode.removeChild(elem);
          }
        })
      })
  }   
}

export default Dictionary;