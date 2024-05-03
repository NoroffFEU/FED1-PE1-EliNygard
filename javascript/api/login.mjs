import { loginMessageError } from "../messages/loginMessages.mjs";
import { removeErrorMessage } from "../messages/removeMessages.mjs";
import { API_AUTH, API_BASE, API_LOGIN } from "./constantAPI.mjs";


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
            localStorage.setItem('userName', JSON.stringify(json));
            
            return json;
        } else {
            if (response.status === 401) {
                loginMessageError();
            } else {
                console.log("Error", json.error || "Something went wrong. Please try again.");
            }
        }
    }catch (error) {
        console.log('Error:', error);
    };
};


document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('js-login-form');
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");

    //Functions to handle form submission
    loginForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        const email = emailInput.value;
        const password = passwordInput.value;

        const userData = {
            email: email,
            password: password
        };

        const loginResponse = await loginUser(API_BASE + API_AUTH + API_LOGIN, userData);
        if (loginResponse) {
            window.location.href = '../post/manage.html';
        }
    });
    
    //Event listeners for input fields
    emailInput.addEventListener('click', removeErrorMessage);
    passwordInput.addEventListener('click', removeErrorMessage);
});


