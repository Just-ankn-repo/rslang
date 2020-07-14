import backend from '../../../backend';

const Register = {
    render: async () => {
        return /* html */ `

        <div class="signup-container">
            <input id="signin" type="radio" name="tab" checked="checked" />
            <input id="register" type="radio" name="tab" />
        <div class="signup-pages">
            <div class="page">
            <form class="login-register-form login-form">
                <div class="input">
                    <div class="title">
                        <object class="signup-icons_mail"></object> EMAIL
                    </div>
                    <input id="email_login_input" class="text" type="email" placeholder="Email"required/>
                </div>

                <div class="input">
                    <div class="title">
                      <object class="signup-icons_lock"></object> PASSWORD
                    </div>
                    <input id="password_login_input" class="text" type="password" required placeholder="Password" 
                    autocomplete="off" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                    title="Must contain at least one  number and one uppercase and lowercase letter, 
                    and at least 8 or more characters"/>
                </div>
                <div class="input">
                  <input type="submit" value="ENTER" />
                </div>
            </form>
            </div>
            <div class="page signup">
            <form class="login-register-form register-form">
                <div class="input">
                    <div class="title">
                      <object class="signup-icons_person"></object> NAME
                    </div>
                    <input id="username_register_input" class="text" type="text" pattern="^[a-zA-ZА-Яа-я]+$" minlength="3"  placeholder="Username"  required/>
                </div>
                <div class="input">
                    <div class="title">
                      <object class="signup-icons_mail"></object> EMAIL
                    </div>
                    <input id="email_register_input" class="text" type="email" placeholder="Email"required/>
                </div>
                <div class="input">
                  <div class="title">
                    <object class="signup-icons_lock"></object> PASSWORD
                  </div>
                  <input id="password_register_input" class="text" type="password" placeholder="" required placeholder="Password" autocomplete="off" 
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                  title="Must contain at least one  number and one uppercase and lowercase letter, 
                  and at least 8 or more characters"/>
                </div>
                <div class="input">
                  <input type="submit" value="SIGN ME UP!" />
                </div>
            </form>
            </div>
        </div>
        <div class="signup-tabs">
          <label class="tab" for="signin">
            <div class="text">Sign In</div>
          </label>
          <label class="tab" for="register">
            <div class="text">Register</div>
          </label>
        </div>
        </div>
        `
    }, 
    
    after_render: async () => {

        document.querySelector('.login-form').addEventListener("submit",  async(event) => {
            const email = document.getElementById('email_login_input');
            const pass = document.getElementById('password_login_input');
            const loginRegisterButton = document.querySelector(".login-register__button");
            const usernameElement = document.getElementById("user-name");
            const authUserElement = document.getElementById("authorized-user");
            const notificationContainer = document.getElementById('notifications');
            const currentNotifyCount = document.getElementById('notify-counter').textContent;
            const incraseNotifyCount = parseInt(currentNotifyCount, 10) + 1;

            event.preventDefault();

            try {
                await backend.signIn(email.value, pass.value);
                const getUserInfo = await backend.getUserById();
                loginRegisterButton.style = 'display:none;';
                usernameElement.innerText = getUserInfo.name;
                authUserElement.style = 'display:block;';
                notificationContainer.innerHTML += `
                <li class="pX-20 pY-15 bdB">
                    <span class="fsz-sm fw-600 c-grey-900">Login succeful</span>
                </li>
                `
                document.getElementById('notify-counter').innerText = incraseNotifyCount;
                window.location.href = '/#/';
            } catch(e) {
                notificationContainer.innerHTML += `
                <li class="pX-20 pY-15 bdB">
                    <span class="fsz-sm fw-600 c-grey-900">Incorrect Login or Password</span>
                </li>
                `
                document.getElementById('notify-counter').innerText = incraseNotifyCount;
            }
        })

        document.querySelector('.register-form').addEventListener("submit",  async(event) => {
            const username = document.getElementById("username_register_input");
            const email = document.getElementById("email_register_input");
            const pass = document.getElementById("password_register_input");
            const notificationContainer = document.getElementById('notifications');
            const currentNotifyCount = document.getElementById('notify-counter').textContent;
            const incraseNotifyCount = parseInt(currentNotifyCount, 10) + 1;

            event.preventDefault();

            try {
                const register = await backend.registerUser(username.value, email.value, pass.value);
                const message = register.id 
                    ? `User with name ${register.name} successfully registered` 
                    : `${register.error.errors[0].message}`;
                notificationContainer.innerHTML += `
                <li class="pX-20 pY-15 bdB">
                    <span class="fsz-sm fw-600 c-grey-900">${message}</span>
                </li>
                `
                document.getElementById('notify-counter').innerText = incraseNotifyCount;
                window.location.href = '/#/';
            } catch(e) {
                notificationContainer.innerHTML += `
                <li class="pX-20 pY-15 bdB">
                    <span class="fsz-sm fw-600 c-grey-900">${e.status}: ${e.message}, ${e.text}</span>
                </li>
                `
                document.getElementById('notify-counter').innerText = incraseNotifyCount;
            }
        });
    }
}

export default Register;