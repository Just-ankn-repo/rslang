import constants from './constants';

export default class SettingsPopup {
  constructor(settings) {
    this.settings = settings;
    this.settingsElem = null;
    this.close = this.close.bind(this);
  }

  init(settings) {
    this.settings = settings;
    this.settingsElem = this.getSettingsElem(this.settings);
    this.render();
    this.bind();
  }

  static getTemplate(settings) {
    return `
        <form class='content-settings-form' action='#' method='get'>
          <h5 class='content-settings-title'>
            You can customize the card contents:
          </h5>
          <ul class='content-options-list'>
            ${Object.keys(constants.CONTENT_LABEL)
              .map((labelName, index) => `
                ${index === 1 
                  ? `
                    <li><fieldset class='content-option-sublist'>
                    <legend class='content-sublist-title'>
                      Word info
                    </legend>`
                  : ''}
                <li class='settings-lang-level-item'>
                  <input type="checkbox" id='${labelName}-${index}' class="checkbox-content-settings" name="${labelName}" '${settings[labelName] ? ' checked' : ''}/>
                  <label class='content-label-wrap' for="${labelName}-${index}">
                    <span class='content-label-item'></span>
                    <span class='content-label-name'>${constants.CONTENT_LABEL[labelName]}</span>
                  </label>
                </li>
                ${index === 3
                  ? `<span class='content-sublist-tip'>
                      At least one of this group must be selected
                    </span></fieldset></li>`
                  : ''}`).join('')}
          </ul>
          <div class='card-settings-btn-list'>
            <button type='submit' class='card-settings-btn'>Apply</button>
            <button type='button' class='card-settings-btn-cancel'>Cancel</button>
        </form>`;
  }

  getSettingsElem(settings = this.settings) {
    const template = this.constructor.getTemplate(settings);
    const settingsPopup = document.createElement('div');

    settingsPopup.classList.add('learn-settings-popup');
    settingsPopup.innerHTML = template;
    return settingsPopup;
  }

  render() {
    document.querySelector('.word-groups-settings').append(this.settingsElem);
  }

  bind() {
    const settingsForm = document.querySelector('.content-settings-form');

    settingsForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      const userSettings = {};

      [...document.querySelectorAll('.checkbox-content-settings')]
        .forEach((input) => {
          userSettings[input.name] = input.checked;
        });
      document.body.removeEventListener('mouseup', this.close);
      this.onUserSettingsChange(userSettings);
    });

    const subOptionsList = document.querySelectorAll('.content-option-sublist .checkbox-content-settings');
    const isNothingSelected = () => {
      const checkedSublistAmount = [...subOptionsList].reduce((acc, input) => input.checked
        ? acc + 1
        : acc, 0);

      return !checkedSublistAmount;
    }

    [...subOptionsList].forEach((input) => {
      input.addEventListener('input', ({target}) => {
        if (isNothingSelected()) {
          const lastCheckedInput = target;
          const sublistWrap = document.querySelector('.content-option-sublist');

          sublistWrap.addEventListener('animationend', () => sublistWrap.classList.remove('content-sublist-animated'), {once: true});
          sublistWrap.classList.add('content-sublist-animated');
          lastCheckedInput.checked = !lastCheckedInput.checked;
        }
      });
    });
  }

  onUserSettingsChange() {
    throw new Error('method should be overriden', this);
  }

  show(target) {
    this.settingsElem = document.querySelector('.word-groups-settings');

    if (this.settingsElem.classList.contains('settings-opened')
      && this.constructor.isSettingsBtnClicked(target)
      || target.classList.contains('card-settings-btn-cancel')) {
      this.settingsElem.classList.remove('settings-opened');
      document.body.removeEventListener('mouseup', this.close);
      return;
    }
    
    this.settingsElem.classList.add('settings-opened');
    document.body.addEventListener('mouseup', this.close);
  }

  close(evt) {
    const target = evt ? evt.target : null;

    // if (
    //   (target && target.closest('.learn-settings-popup')
    //     && !target.classList.contains('card-settings-btn-cancel'))
    //   || this.isSettingsBtnClicked(target)
    // ) {
    if (
      (target && target.closest('.learn-settings-popup')
        && !target.classList.contains('card-settings-btn-cancel'))
      || this.constructor.isSettingsBtnClicked(target)
    ) {
      return;
    }

    const settingsPopup = document.querySelector('.learn-settings-popup');

    if (!settingsPopup) {
      return;
    }

    this.settingsElem.classList.remove('settings-opened');
    document.body.removeEventListener('mouseup', this.close);
  }

  static isSettingsBtnClicked(target) {
    return target && target.closest('.word-groups-settings') && !target.closest('.learn-settings-popup');
  }
}