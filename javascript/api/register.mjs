import { extractErrorMessages, renderErrorMessageHtml } from "../messages/errorMessage.mjs";
import { confirmPasswordError } from "../messages/loginMessages.mjs";
import { removeErrorMessage } from "../messages/removeMessages.mjs";
import { API_AUTH, API_BASE, API_REGISTER } from "./constantAPI.mjs";

async function registerUser (url, userData) {
    // loader show

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
            localStorage.setItem('registerSuccess', true);
            localStorage.setItem('userName', JSON.stringify(json.data.name));
            
            window.location.href = '../post/manage.html';
            // replace alert with success message
            // alert('User registered successfully');
            
            return json;
        } else {
            // display error message
            const errorMessages = extractErrorMessages(json)
            renderErrorMessageHtml(errorMessages)
            console.log("Error", json.error);
        }
    } catch (error) {
            console.error('Error:', error);
    } finally {
        // loader hide
    }
}

const registerForm = document.getElementById('js-registration-form');

registerForm.addEventListener('submit', async function (event) {
    event.preventDefault(); //prevents the default form submission behavior
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    
    
    if (password !== confirmPassword) {
        confirmPasswordError()
        return;
    };
    
    const userData = {
        name: name,
        email: email,
        password: password
    };


    console.log(userData);

    const loginResponse = await registerUser(API_BASE + API_AUTH + API_REGISTER, userData);
    if (loginResponse) {
        // window.location.href = '../post/manage.html';
    }
});

// event listeners for input fields. When user want to try again
registerForm.addEventListener('click', removeErrorMessage);