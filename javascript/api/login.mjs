import { loginMessageError } from "../messages/loginMessages.mjs";
import { removeErrorMessage } from "../messages/removeMessages.mjs";
import { hideLoader, showLoader } from "../ui/loader.mjs";
import { API_AUTH, API_BASE, API_LOGIN } from "./constantAPI.mjs";


async function loginUser(url, userData) {
    showLoader()

    try {
        // Promise for testing, REMOVE
        await new Promise(resolve => setTimeout(resolve, 4000));
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
            localStorage.setItem('userName', JSON.stringify(json.data.name));
            
            window.location.href = '../post/manage.html';

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
    } finally {
        hideLoader();
    }
};


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

    await loginUser(API_BASE + API_AUTH + API_LOGIN, userData);
    
});

//Event listener for form when user wants to try again
loginForm.addEventListener('click', removeErrorMessage);


