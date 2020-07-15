import backend from './backend';
import cookie from './utils/cookie.utils';

export default (async function(){
  const loginRegisterButton = document.querySelector(".login-register__button");
  const usernameElement = document.getElementById("user-name");
  const authUserElement = document.getElementById("authorized-user");
  const getUserInfo = await backend.getUserById('notExpired');

  if (getUserInfo) {
    loginRegisterButton.style = 'display:none;';
    usernameElement.innerText = getUserInfo.name;
    authUserElement.style = 'display:block;';
  }

  document.getElementById('logout').addEventListener('click', () => {
    cookie.deleteCookie('userId');
    cookie.deleteCookie('authToken');
  })
})();
