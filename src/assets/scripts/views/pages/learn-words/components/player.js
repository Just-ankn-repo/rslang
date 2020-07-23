import constants from './constants';

export default class Player {
  constructor(isAudioOn) {
    this.currentAudioSrcList = [];
    this.playerElem = null;
    this.isAudioOn = isAudioOn;
    this.init();
  }

  init() {
    this.playerElem = new Audio();
    this.audioEndHandler = this.audioEndHandler.bind(this);
  }

  updateAudioList({settings}, currentData) {
    // this.isAudioOn = isAudioOn;
    // if (!this.isAudioOn) {
    //   return;
    // }
    const currentAudioData = {
      word: `${constants.DATA_URL}${currentData.audio}`,
      meaning: this.constructor.isMeaningShouldBePlayed(settings) && `${constants.DATA_URL}${currentData.audioMeaning}`,
      example: this.constructor.isExampleShouldBePlayed(settings) && `${constants.DATA_URL}${currentData.audioExample}`,
    };

    this.currentAudioSrcList = Object.values(currentAudioData)
      .filter((item) => item !== false);
  }

  static isMeaningShouldBePlayed(settings) {
    return settings.optional.cardContent.textMeaning && settings.optional.cardContent.audioMeaning;
  }

  static isExampleShouldBePlayed(settings) {
    return settings.optional.cardContent.textExample && settings.optional.cardContent.audioExample;
  }

  pause() {
    if (!this.isAudioOn) {
      return;
    }

    this.playerElem.pause();
    this.playerElem.removeEventListener('ended', this.onAudioEnd, { once: true });
  }

  playCurrent() {
    if (!this.isAudioOn) {
      return;
    }

    this.currentIndex = 0;

    // this.playerElem.addEventListener('ended', () => {
    //   if (currentIndex === this.currentAudioSrcList.length - 1) {
    //     this.onAudioEnd();
    //   } else {
    //     currentIndex += 1;
    //     this.playNextSentence(currentIndex);
    //   }
    // }, {once: true});

    this.playNextSentence();
  }

  playNextSentence() {
    this.playerElem.addEventListener('ended', this.audioEndHandler, { once: true });

    this.playerElem.src = this.currentAudioSrcList[this.currentIndex];
    this.playerElem.play();
  }

  audioEndHandler() {
    if (this.currentIndex === this.currentAudioSrcList.length - 1) {
      this.onAudioEnd();
    } else {
      this.currentIndex += 1;
      this.playNextSentence(this.currentIndex);
    }
  }

  onAudioEnd() {
    throw new Error('method should be overriden', this);
  }
}