import generateContainer from "./dictionary-container";

const Dictionary = {
  render : async () => {
      const view =  /* html */`
        <div class="dictionary">
            <div class="wrapper">
                <div class="dictionary-control">
                    <h1 class="dictionary-control__heading">Словарь</h1>
                    <button class="button learn-button">Изучить новые слова</button>
                </div>

                <div class="dictionary-tools">
                        <p>
                            <input class="dictionary-tools__checkbox" id="checkAll" type="checkbox">
                        </p>
                        <input type="text" placeholder="Найти" class="dictionary-tools__search">
                        <div class="dictionary-tools__compact-btn"></div>
                        <div class="dictionary-tools__sorting">
                            <object title="Все слова" class="dictionary-tools__sorting_all"></object>
                            <object title="Новые слова" class="dictionary-tools__sorting_new"></object>
                            <object title="На изучении" class="dictionary-tools__sorting_studying"></object>
                            <object title="Изучено" class="dictionary-tools__sorting_studied"></object>
                        </div>
                </div>

                <div class="dictionary-modal none">
                    <object class="dictionary-modal__close-button"></object>

                    <div class="dictionary-card">
                        <img src="https://raw.githubusercontent.com/irinainina/rslang-data/master/files/01_0009.jpg" class="dictionary-card__image">
                        <div class="dictionary-card__transcription"><object class="dictionary-card__audio-icon"></object>[savanna]</div>
                        <div class="dictionary-card__word">savanna</div>
                        <div class="dictionary-card__translation">саванна</div>
                        <div class="dictionary-card__example">bla bla bla</div>
                        <div class="dictionary-modal__arrows">
                            <object class="dictionary-modal__button_left"></object>
                            <object class="dictionary-modal__button_right"></object>
                        </div>
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

    function getWords() {
        const url = `https://afternoon-falls-25894.herokuapp.com/words?page=0&group=0`;
        return fetch(url)
          .then((res) => res.json())
          .then((data) => {
            const div = generateContainer(data);
            document.getElementById('content').append(div);
          });
      };

      getWords()

    document.querySelector('.dictionary-modal__close-button').addEventListener('click', () => {
        console.log('click')
        document.querySelector('.dictionary-modal').classList.add('none');
    })

    //! CHECKBOX
        for(let i=0; i < document.querySelectorAll('.dictionary-element__checkbox').length; i+=1) {
            document.querySelectorAll('.dictionary-element__checkbox')[i].onclick = () => {
                const allChecked = document.querySelectorAll('.dictionary-element__checkbox:checked').length;
                document.getElementById('checkAll').checked = allChecked === document.querySelectorAll('.dictionary-element__checkbox').length;
                document.getElementById('checkAll').indeterminate = allChecked > 0 
                && allChecked < document.querySelectorAll('.dictionary-element__checkbox').length;
            }
        }
        
        document.getElementById('checkAll').onclick = () => {
            for(let i=0; i<document.querySelectorAll('.dictionary-element__checkbox').length; i+=1) {
                document.querySelectorAll('.dictionary-element__checkbox')[i].checked = 
                !document.querySelectorAll('.dictionary-element__checkbox')[i].checked;
            }
        }







        
  }   
}

export default Dictionary;