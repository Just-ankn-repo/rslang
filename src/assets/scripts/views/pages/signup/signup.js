import backend from '../../../backend';

const Register = {
    render: async () => {
        return /* html */ `
            <div class='signup-container'>
                <div class="login-register-switch">
                    <div class="login-switch active">Login</div>
                    <div class="register-switch">Register</div>
                </div>

                <form class="login-register-form login-form">
                    <div class="login-register-form__field">
                        <input class="input" id="email_login_input" type="email" placeholder="Email" required>
                    </div>
                    <div class="login-register-form__field">
                        <input class="input" id="password_login_input" type="password" placeholder="Password" autocomplete="off" required pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                        title="Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters">
                    </div>
                    <div class="login-register-form__field">
                        <button class="login-button" id="login_submit_btn" type="submit">Login</button>
                    </div>
                </form>

                <form class="login-register-form register-form" style="display:none;">
                    <div class="login-register-form__field">
                        <input class="input" id="username_register_input" type="text" pattern="^[a-zA-ZА-Яа-я]+$" minlength="3"  placeholder="Username" required>
                    </div>
                    <div class="login-register-form__field">
                        <input class="input" id="email_register_input" type="email" placeholder="Email" required>
                    </div>
                    <div class="login-register-form__field">
                        <input class="input" id="password_register_input" type="password" placeholder="Password" autocomplete="off" required pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                        title="Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters">
                    </div>
                    <div class="login-register-form__field">
                        <button class="register-button" id="register_submit_btn" type="submit">Register</button>
                    </div>
                </form>
            </div>
        `
    }, 
    
    after_render: async () => {
        document.querySelector('.login-register-switch').addEventListener("click",  (event) => {
            const loginSwitcher = document.querySelector('.login-switch');
            const registerSwitcher = document.querySelector('.register-switch');
            const loginForm = document.querySelector('.login-form');
            const registerForm = document.querySelector('.register-form');
            if (event.target === loginSwitcher) {
                registerSwitcher.classList.remove('active');
                registerForm.style = 'display:none;';
                loginSwitcher.classList.add('active');
                loginForm.style = 'display:block;';
            }

            if (event.target === registerSwitcher) {
                loginSwitcher.classList.remove('active');
                loginForm.style = 'display:none;';
                registerSwitcher.classList.add('active');
                registerForm.style = 'display:block;';
            }
        });

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