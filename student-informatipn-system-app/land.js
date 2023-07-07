const login_btn = document.querySelector('.login');
const usernameText = document.querySelector('.username');
const passwordText = document.querySelector('.password');
const container = document.querySelector('.container');
login();
function login() {
    login_btn.addEventListener('click', (e) => {
        e.preventDefault();
        const username = usernameText.value;
        // lS username
        localStorage.setItem('username', username);
        const password = passwordText.value;
        console.log(username);
        console.log(password);


        const error_page = document.createElement('div');
        error_page.classList.add('error-container');
        if (username === '' || password === '') {
            error_page.innerHTML = `
            <i class="fa-solid fa-exclamation fa-fade"></i>
                <p>You can't leave it blank</p>
            `;
            container.appendChild(error_page);

            setTimeout(() => {
                error_page.remove();
            }, 2000);
            return;
        }

        else if (!/\d/.test(password) || !/[A-Z]/.test(password) || !/[@!.,<>]/.test(password)) {
            error_page.innerHTML = `
            <i class="fa-solid fa-exclamation fa-fade"></i>              
            <p>Must contain at least one uppercase letter, number and special character.</p>
            `;
            container.appendChild(error_page);
            setTimeout(() => {
                error_page.remove();
            }, 3000);
            return;
        }

        else {
            const info = document.createElement('div');
            info.classList.add('info');
            info.innerHTML = `
            <h3>Logging in</h3>
            <i class="fa-solid fa-spinner fa-spin-pulse"></i>
            `;
            container.appendChild(info);
            setTimeout(() => {
                window.location.href = 'system.html';
            }, 2000)
        }
    })
}