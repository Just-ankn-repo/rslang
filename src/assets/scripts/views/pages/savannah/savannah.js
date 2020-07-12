import SavannahController from './components/savannah-controller';
import Service from './components/service';

const savannah = {
  render: async () => {
    const view =  /* html */`
          <div class='container savannah-container'>
            <h1 class='game-title'>SAVANNAH</h1>
            <p class='game-descr'>
              Coaching Savannah develops vocabulary. You will receive experience points.
            </p>
            <button class='btn start-game-btn'>
              Start
            </button>
          </div>`;

    return view
  },
  after_render: async () => {
    Service.getQuestionsList()
      .then((exampleData) => new SavannahController(exampleData));
  }
}

export default savannah;