import { API_AUTH, API_BASE, API_REGISTER } from "./constantAPI.mjs";

async function registerUser (url, userData) {
    try {

        // const existingUserResponse = await fetch(url + `?email=${userData.email}`);
        // const existingUserJson = await existingUserResponse.json();

        // if (existingUserJson.exists) {
        //     alert('User with the same email already exists');
        //     return;
        // }

        const postData = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
              },
            body: JSON.stringify(userData),
            };
        const response = await fetch(url, postData);
        const json = await response.json();
        return json;
    } 
        
        catch (error) {
            console.error('Error:', error);
    }
}


document.addEventListener('DOMContentLoaded', function () {
    const registerForm = document.getElementById('js-registration-form');
    
    registerForm.addEventListener('submit', async function (event) {
        event.preventDefault(); //prevents the default form submission behavior
        
        const name = document.getElementById('name').value;
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
        
        await registerUser(API_BASE + API_AUTH + API_REGISTER, userData);
        
    });
});


// const userData = {
//     name: 'lelinyga',
//     email: 'lelinyga@stud.noroff.no',
//     password: 'Test1234'
// }

// registerUser(API_BASE + API_AUTH + API_REGISTER, userData);