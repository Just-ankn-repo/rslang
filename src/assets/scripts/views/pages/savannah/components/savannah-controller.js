import SavannahView from './savannah-view';
import SavannahModel from './savannah-model';
import statistic from './statistic';
import Service from './service';

export default class SavannaController {
  constructor(exampleData) {
    this.model = new SavannahModel(exampleData);
    this.view = new SavannahView(this.model.roundQuestions, this.model.state);
    this.bind();
  }

  bind() {
    this.view.onUserAnswer = (isCorrect, questionWord) => {
      statistic.saveQuestion(isCorrect, questionWord);
      this.model.updateState(isCorrect);
      // const {isRoundEnded} = this.model;
      if (this.model.isGameEnded) {
        const gameResult = this.model.isGameEnded.isWin;
        statistic.render(gameResult, this.model.state);
        return;
      }
      // if (isRoundChanged) {
      //   Service.getQuestionsList(this.model.state.langLevel, this.model.state.round)
      //     .then((wordsList) => {
      //       this.model.updateQuestionsList(wordsList);
      //       this.view.changeQuestion(this.model.state, this.model.roundQuestions);
      //     });
      // } else {
        this.view.changeQuestion(this.model.state);
      // }
    }
  }
}