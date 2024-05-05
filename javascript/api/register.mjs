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
            localStorage.setItem('userName', JSON.stringify(json));
            
            alert('User registered successfully');
            
            return json;
        } else {
            console.log("Error", json.error);
        }
    } catch (error) {
            console.error('Error:', error);
    } finally {
        // loader hide
    }
}

// document.addEventListener('DOMContentLoaded', function () {
    const registerForm = document.getElementById('js-registration-form');
    
    registerForm.addEventListener('submit', async function (event) {
        event.preventDefault(); //prevents the default form submission behavior
        
        const name = document.getElementById('name').value;
        console.log(name);
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        
        
        if (password !== confirmPassword) {
            alert("Passwords do not match! Try again");
            return;
        };
        
        const userData = {
            name: name,
            email: email,
            password: password
        };

        const loginResponse = await registerUser(API_BASE + API_AUTH + API_REGISTER, userData);
        if (loginResponse) {
            window.location.href = '../post/manage.html';
        }
    });
// });


// const userData = {
//     name: 'lelinyga',
//     email: 'lelinyga@stud.noroff.no',
//     password: 'Test1234'
// }

// registerUser(API_BASE + API_AUTH + API_REGISTER, userData);