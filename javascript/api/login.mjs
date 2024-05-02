import { API_AUTH, API_BASE, API_LOGIN } from "./constantAPI.mjs";

// const userLogin = {
//     email: 'eli.nygaard@stud.noroff.no',
//     password: 'Myfirstblog25'
// };

// loginUser(API_BASE + API_AUTH + API_LOGIN, userLogin);

async function loginUser(url, userData) {
    try {
        const postData = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',            
            },
            body: JSON.stringify(userData),
        };
        const response = await fetch(url, postData);
        console.log(response);
        const json = await response.json();
        console.log(json);
        if (response.ok) {
            const accessToken = json.data.accessToken;
            localStorage.setItem('accessToken', accessToken);
            
            localStorage.setItem('loginSuccess', true);
            // alert('Login successful');
            window.location.href = '../post/manage.html';
        } else {
            console.log('Login failed', json.error);
        }
        // return json;
    }catch (error) {
        console.log('Error:', error);
    };
};

document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('js-login-form');

    loginForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const userData = {
            email: email,
            password: password
        };

        await loginUser(API_BASE + API_AUTH + API_LOGIN, userData);
        
    });
});

