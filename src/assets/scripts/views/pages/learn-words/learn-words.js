// import backend from '../../../backend';
import WordsController from './components/words-controller';
import Service from './components/service';

const LearnWords = {
  render: async () => {
    const view =  /* html */`
            <section class="words-main-page">
              <div class='words-main-content'>
                <h1 class='words-main-title'>
                  Efficient way of learning
                </h1>
                <p class='words-main-descr'>
                  With lots of practice, vocabulary in your new language will become more and more automatically available to you. Repetition is the most well-known tactic for memorization.
                <p class='words-main-descr'>
                  This is why flashcards are so effective. They’re easy, customizable, and can be taken anywhere!
                </p>
                <button class='btn words-main-btn'>Start</button>
              </div>
            </section>
        `

    return view
  },
  after_render: async () => {
    // user@user.com
    // userPassword_1312412412

    const startBtn = document.querySelector('.words-main-btn');

    startBtn.addEventListener('click', () => {
      const requests = [Service.getWords(), Service.getSettings()];

      Promise.all(requests)
        .then(responses => new WordsController(...responses));
    });
  }

}

export default LearnWords;