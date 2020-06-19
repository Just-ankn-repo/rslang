import SavannahView from './savannah-view';
import SavannahModel from './savannah-model';
import Service from './service';

export default class SavannaController {
  constructor(exampleData) {
    this.model = new SavannahModel(exampleData);
    this.view = new SavannahView(this.model.questions, this.model.state);
    this.bind();
  }

  bind() {
    this.view.onUserAnswer = (isCorrect) => {
      const isLevelChanged = this.model.updateState(isCorrect);
      if (isLevelChanged) {
        Service.getQuestionsList(this.model.state.level)
          .then((wordsList) => {
            this.model.updateQuestionsList(wordsList);
            this.view.changeQuestion(this.model.state, this.model.questions);
          });
      } else {
        this.view.changeQuestion(this.model.state);
      }
    }
  }
}